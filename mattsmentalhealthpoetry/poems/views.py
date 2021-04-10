from mattsmentalhealthpoetry import db
from mattsmentalhealthpoetry.poems import bp
from mattsmentalhealthpoetry.poems.forms import CreatePoemForm
from mattsmentalhealthpoetry.models import User, Poem
from mattsmentalhealthpoetry.poems.poem_img_handler import add_poem_pic

from flask import render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user



@bp.route('/create_poem', methods=['GET', 'POST'])
@login_required
def create_poem():

    form = CreatePoemForm()

    if form.validate_on_submit():
        if form.image.data:
            image_filename = add_poem_pic(form.image.data, current_user.id,
                                        form.title.data, len(Poem.query.all()))
        else:
            image_filename = ''
        new_poem = Poem(title=form.title.data, content=form.content.data,
                        user=current_user, poem_image=image_filename,
                        published=form.publish.data)
        db.session.add(new_poem)
        db.session.commit()
        flash(f"{new_poem.title} added to " \
                f"{current_user.name.split(' ')[0] + 's'} poem list")
        return redirect(url_for('core.home'))

    return render_template('create_poem.html', title="Create", form=form,
                            edit=False, poem=None)
