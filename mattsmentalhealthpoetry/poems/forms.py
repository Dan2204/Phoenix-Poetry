from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from flask import session

from mattsmentalhealthpoetry.models import Poem


class CreatePoemForm(FlaskForm):

    title = StringField('Title: ', validators=[DataRequired()])
    image = FileField('Add Image: ', validators=[
                        FileAllowed(['jpg', 'png', 'gif', 'jpeg'])])
    content = TextAreaField('Poem: ', validators=[DataRequired()])
    publish = BooleanField('Publish: ')
    submit_poem = SubmitField('Save')

    def validate_title(self, title):
        name = Poem.query.filter_by(title=title.data).first()
        if name is not None:
            raise ValidationError('That title has already been used.')


class EditPoemForm(FlaskForm):

    title = StringField('Title: ', validators=[DataRequired()])
    image = FileField('Add Image: ', validators=[
                        FileAllowed(['jpg', 'png', 'gif'])])
    content = TextAreaField('Poem: ', validators=[DataRequired()])
    publish = BooleanField('Publish: ')
    submit_poem = SubmitField('Save Changes')

    def validate_title(self, title):
        if title.data != session['current_poem']:
            if Poem.query.filter_by(title=title.data).first():
                raise ValidationError('That title has already been used.')



class CommentForm(FlaskForm):

    comment = TextAreaField('Comment: ', validators=[DataRequired()])
    submit_comment = SubmitField('Submit')
