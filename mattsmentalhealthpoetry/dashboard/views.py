from mattsmentalhealthpoetry import db
from mattsmentalhealthpoetry.dashboard import bp
from mattsmentalhealthpoetry.models import Poem, User, Comment
from mattsmentalhealthpoetry.poems.poem_img_handler import add_poem_pic
from mattsmentalhealthpoetry.poems.forms import CreatePoemForm, EditPoemForm

from flask import render_template, redirect, url_for, flash, request, session
from flask_login import login_required, current_user
from datetime import datetime



@bp.route('/dashboard')
@login_required
def admin():

    if not current_user.admin:
        return redirect(url_for('core.home'))

    poems = User.query.filter_by(
        display_name=current_user.display_name
        ).first().poems
    new_comments = Comment.query.filter_by(approve=False).all()
    del_comments = Comment.query.filter_by(deleted=True).all()
    del_poems = Poem.query.filter_by(active=False).all()
    del_users = User.query.filter_by(active=False).all()
    deleted = {'Users': len(del_users),
               'Comments': len(del_comments),
               'Poems': 0}
    published = []
    unpublished = []

    for poem in poems:
        if poem.active:
            if poem.published:
                published.append(poem)
            else:
                unpublished.append(poem)

    published_i = 0
    unpublished_i = 0
    for poem in poems:
        if not poem.active:
            deleted['Poems'] += 1
        elif poem.published:
            published_i += 1
        else:
            unpublished_i += 1

    return render_template('dashboard_admin.html', title='admin', poems=poems,
                            published_i=published_i, unpublished_i=unpublished_i,
                            comments=new_comments, deleted=deleted,
                            published=published, unpublished=unpublished,
                            del_poems=del_poems, del_users=del_users,
                            del_comments=del_comments)



@bp.route('/dashboard/publish/<int:poem_id>/<publish_poem>')
@login_required
def publish(poem_id, publish_poem):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    poem = Poem.query.get_or_404(poem_id)
    publish_poem = True if publish_poem == "True" else False
    poem.published = publish_poem
    db.session.commit()
    if publish_poem:
        flash(f"'{poem.title}' is now published")
    else:
        flash(f"'{poem.title}' is now unpublished")

    return redirect(url_for('dashboard.admin'))



@bp.route('/dashboard/delete-poem/<int:poem_id>')
@login_required
def delete_bin_poem(poem_id):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    poem = Poem.query.get_or_404(poem_id)
    poem.active = False
    poem.published = False
    db.session.commit()
    flash(f"'{poem.title}' has been sent to the bin")

    return redirect(url_for('dashboard.admin'))



@bp.route('/dashboard/comment_approval/<int:comment_id>/<approve_deny>/<title>')
@login_required
def comment_approval(comment_id, approve_deny, title):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    comment = Comment.query.get_or_404(comment_id)
    if approve_deny == "approve":
        comment.approve = True
        message = "Comment approved"
    else:
        comment.approve = True
        comment.deleted = True
        comment.active = False
        message = "Comment sent to bin"
    db.session.commit()
    flash(message)

    if title == "All Comments":
        return redirect(url_for('dashboard.all_new_comments',
                                    user_id=current_user.id))

    return redirect(url_for('dashboard.admin'))



@bp.route('/dashboard/restore_delete_poem/<int:poem_id>/<restore>')
@login_required
def restore_delete_poem(poem_id, restore):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    restore = True if restore == "True" else False
    poem = Poem.query.get_or_404(poem_id)

    if restore:
        poem.active = True
        message = "Poem restored unpublished"
    else:
        poem.user = None
        for comment in poem.comments:
            comment.author = None
            db.session.delete(Comment.query.filter_by(id=comment.id).first())

        db.session.delete(poem)
        message = "Poem has been deleted"

    db.session.commit()
    flash(message)

    return redirect(url_for('dashboard.admin'))



@bp.route('/dashboard/restore_delete_user/<int:user_id>/<restore>')
@login_required
def restore_delete_user(user_id, restore):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    restore = True if restore == "True" else False
    user = User.query.get_or_404(user_id)

    if restore:
        user.active = True
        message = "User restored"
    else:
        db.session.delete(user)
        message = "User has been deleted"

    db.session.commit()
    flash(message)
    return redirect(url_for('dashboard.admin'))



@bp.route('/dashboard/restore_delete_comment/<int:comment_id>/<restore>')
@login_required
def restore_delete_comment(comment_id, restore):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    restore = True if restore == "True" else False
    comment = Comment.query.get_or_404(comment_id)

    if restore:
        comment.active = True
        comment.approve = False
        comment.deleted = False
        message = "Comment moved for approval"
    else:
        comment.poem = None
        db.session.delete(comment)
        message = "Comment has been deleted"

    db.session.commit()
    flash(message)

    return redirect(url_for('dashboard.admin'))


# /<int:user_id>
@bp.route('/dashboard/view_all_comments')
@login_required
def all_new_comments():

    if not current_user.admin:
        return redirect(url_for('core.home'))

    # user = User.query.get_or_404(user_id)

    new_comments = Comment.query.filter_by(approve=False).all()

    return render_template('view_all_new_comments.html', title="All Comments",
                            comments=new_comments)



@bp.route('/dashboard/edit-poem/<int:poem_id>', methods=['GET', 'POST'])
@login_required
def editpoem(poem_id):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    poem = Poem.query.get_or_404(poem_id)

    if poem.user != current_user:
        abort(403)

    form = EditPoemForm()

    if form.validate_on_submit():
        if form.image.data:
            image_filename = add_poem_pic(form.image.data, current_user.id,
                                        form.title.data, len(Poem.query.all()))
            poem.image_filename = image_filename
        poem.title = form.title.data
        poem.content = form.content.data
        poem.last_modified = datetime.utcnow()
        poem.published = False
        session['current_poem'] = ""
        db.session.commit()
        flash(f"'{poem.title}' has been updated")

        return redirect(url_for('dashboard.admin'))

    elif request.method == "GET":
        form.title.data = poem.title
        form.image.data = poem.poem_image
        form.content.data = poem.content
        form.publish.data = poem.published
        session['current_poem'] = poem.title

    return render_template('create_poem.html', title=f"Edit '{poem.title}'",
                            poem=poem, form=form, edit=True)
