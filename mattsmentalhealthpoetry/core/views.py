import operator

from mattsmentalhealthpoetry import db
from mattsmentalhealthpoetry.core import bp
from mattsmentalhealthpoetry.models import Poem, Comment, User
from mattsmentalhealthpoetry.poems.forms import CommentForm

from flask import render_template, redirect, url_for, flash
from flask_login import current_user, login_required



@bp.route('/')
@bp.route('/index/', methods=['GET', 'POST'])
@bp.route('/index/<int:poem_id>', methods=['GET', 'POST'])
def home(poem_id=None):


    ###################
    # Check For Users #
    ###################
    user_check = User.query.all()
    if not user_check or (len(user_check) == 1
                      and user_check[0].name == "Dan Lucas"):
        return redirect(url_for('users.create_user'))

    # Assign form #
    form = CommentForm()

    # Assign current users poems if loggged on and poems present and published #
    if current_user.is_authenticated and current_user.poems:
        poems_us = [poem for poem in current_user.poems if poem.published]
        poems = sorted(poems_us, key=operator.attrgetter('creation_date'),
                        reverse=True)
    else:
        poems = Poem.query.filter_by(published=True).order_by(
                                                       Poem.creation_date.desc()
                                                       ).all()

    if poem_id is not None:
        view_poem = [poem for poem in poems if poem.id == poem_id]
        if view_poem:
            view_poem = view_poem[0]
            comments = [comment for comment in view_poem.comments
                                if poems and comment.approve and comment.active]
        else:
            flash("Invalid Poem")
            view_poem = poems[0] if poems else poems

    else:
        if poems:
            view_poem = poems[0]
            comments = [comment for comment in view_poem.comments
                                if poems and comment.approve and comment.active]
        else:
            view_poem = poems
            comments = []



    num_comments = len(comments) if comments else 0

    if form.validate_on_submit() and poem_id is not None:
        poem = Poem.query.filter_by(id=poem_id).first()
        new_comment = Comment(comment=form.comment.data, poem=poem,
                                author=current_user, approve=False)
        if current_user.display_name == "@matt-lucas":
            new_comment.aprove = True

        new_comment.active = True
        db.session.add(new_comment)
        db.session.commit()
        flash(f"Comment for {poem.title} sent for approval")
        return redirect(url_for('core.home', poem_id=poem_id))


    return render_template('home.html', title="Home", poems=poems,
                            form=form, poem=view_poem,
                            num_comments=num_comments, select=poem_id)



@bp.route('/comment/delete/<comment_id>')
@login_required
def delete_comment(comment_id):

    comment = Comment.query.filter_by(id=comment_id).first()
    comment.active = False
    comment.deleted = True
    db.session.commit()
    flash(f"Comment #{comment.id} has been moved to bin")

    return redirect(url_for('core.home'))



@bp.route('/about')
def about():

    return render_template('about.html', title="About")



@bp.route('/view_poem', methods=['GET', 'POST'])
def view_poem():

    form = CommentForm()

    poem = Poem.query.filter_by(published=True).first()
    comments = [comment for comment in poem.comments if not comment.deleted]


    return render_template('view_poem.html', title="view", poem=poem,
                            num_comments=len(comments), form=form, preview=False)
