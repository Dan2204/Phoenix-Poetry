from flask_wtf import FlaskForm
from wtforms import (StringField, SubmitField, TextAreaField, PasswordField,
                        BooleanField)
from wtforms.validators import DataRequired, Email, EqualTo
from wtforms import ValidationError

from flask import session
from flask_login import current_user
from mattsmentalhealthpoetry.models import User



# ==> LOGIN FORM <==
class LoginForm(FlaskForm):

    email = StringField('Email: ', validators=[DataRequired(), Email()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    submit_login = SubmitField('Login')



# ==> REGISTER FORM <==
class RegisterForm(FlaskForm):

    name = StringField('Name: ', validators=[DataRequired()])
    email = StringField('Email: ', validators=[DataRequired(), Email()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    password_conf = PasswordField('Confirm Password: ', validators=[
                                    DataRequired(), EqualTo('password',
                                        message='Passwords must match!')])
    admin = BooleanField('Make Admin: ')
    submit_register = SubmitField('Register')

    # --> Form Validation <--
    def validate_name(self, name):
        user = User.query.filter_by(name=name.data).first()
        if user is not None:
            raise ValidationError('That name is already in use.')

    def validate_email(self, email):
        email = User.query.filter_by(email=email.data).first()
        if email is not None:
            raise ValidationError('That email is already in use.')



# ==> REGISTER FORM <==
class EditUserForm(FlaskForm):

    name = StringField('Name: ', validators=[DataRequired()])
    email = StringField('Email: ', validators=[DataRequired(), Email()])
    admin = BooleanField('Make Admin: ')
    submit_register = SubmitField('Save Changes')

    # --> Form Validation <--
    def validate_name(self, name):
        if name.data != session['name']:
            if User.query.filter_by(name=name.data).first():
                raise ValidationError('That name is already in use.')

    def validate_email(self, email):
        if email.data != session['email']:
            if User.query.filter_by(email=email.data).first():
                raise ValidationError('That email is already in use.')


# ==> CHANGE PASSWORD FORM <==
class ChangePasswordForm(FlaskForm):

    old_password = PasswordField('Old Password: ', validators=[DataRequired()])
    new_password = PasswordField('New Password: ', validators=[DataRequired()])
    conf_pass = PasswordField('Confirm Password: ', validators=[DataRequired(),
                                                                EqualTo('new_password')])
    submit_pass_change = SubmitField('Change Password')



# ==> CHANGE USER PASSWORD FORM <==
class ChangeUserPasswordForm(FlaskForm):

    new_password = PasswordField('New Password: ', validators=[DataRequired()])
    conf_pass = PasswordField('Confirm Password: ', validators=[DataRequired(),
                                                                EqualTo('new_password')])
    submit_pass_change = SubmitField('Change Password')
