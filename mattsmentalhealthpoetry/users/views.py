from flask import render_template, redirect, url_for, request, flash, session
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.urls import url_parse

from mattsmentalhealthpoetry.users.forms import (RegisterForm, LoginForm,
                                                 ChangePasswordForm,
                                                 ChangeUserPasswordForm,
                                                 EditUserForm)
from mattsmentalhealthpoetry.models import User
from mattsmentalhealthpoetry.users import bp
from mattsmentalhealthpoetry import db



@bp.route('/create_user', methods=['GET', 'POST'])
def create_user():

    if current_user.is_authenticated and not current_user.admin:
        return redirect(url_for('user.login'))

    form = RegisterForm()
    users = User.query.all()

    if form.validate_on_submit():
        if form.name.data == 'Dan Lucas':
            admin = True
        else:
            admin = form.admin.data
        new_user = User(name=form.name.data, email=form.email.data,
                        password=form.password.data, admin=admin)
        db.session.add(new_user)
        db.session.commit()
        flash(f'{new_user.display_name} has been created')
        if not current_user.is_authenticated:
            return redirect(url_for('users.login'))

        return redirect(url_for('dashboard.admin'))

    return render_template('create_user.html', title='Create User', form=form,
                            users=users, edit=False)



@bp.route('/users/login', methods=['GET', 'POST'])
def login():

    if current_user.is_authenticated:
        return redirect(url_for('core.home'))
    if not User.query.all():
        return redirect(url_for('users.create_user'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if not user.active:
            flash("Sorry, account suspended, please contact admin.")
            return redirect(url_for('users.login'))
        if user is None or not user.check_password(form.password.data):
            flash('Invalid email or password')
            return redirect(url_for('users.login'))
        login_user(user)
        flash(f'{user.display_name} is now logged in.')
        next = request.args.get('next')
        if not next or url_parse(next).netloc != '':
            next = url_for('core.home')
        return redirect(next)

    return render_template('login.html', title='Login', form=form)



@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('core.home'))


@bp.route('/users/change_password', methods=['GET', 'POST'])
@bp.route('/users/change_password/<user_id>', methods=['GET', 'POST'])
@login_required
def change_password(user_id=None):

    user = (User.query.filter_by(id=user_id).first()
            if user_id != None else
            User.query.filter_by(id=current_user.id).first())

    admin_PW_reset = (True
                      if user.id != current_user.id and current_user.admin else
                      False)

    form = ChangeUserPasswordForm() if admin_PW_reset else ChangePasswordForm()

    if form.validate_on_submit():

        checked_password = (True
                            if admin_PW_reset else
                            user.check_password(form.old_password.data))

        if checked_password:
            user.set_password(form.new_password.data)
            db.session.commit()
            flash(f"Changed password for {user.display_name}")

            return redirect(url_for('dashboard.admin'))

        flash("Incorrect passwod")
        return redirect(url_for('users.change_password'))

    return render_template('change_password.html', title="Change Password",
                            form=form, admin_PW_reset=admin_PW_reset,
                            user_name=user.name)



@bp.route('/users/edit')
@login_required
def edit_users():

    if not current_user.admin:
        return redirect(url_for('core.home'))

    user_list = User.query.all()

    return render_template('edit_users.html', title="Edit Users",
                            user_list=user_list)



@bp.route('/users/delete/<user_id>')
@login_required
def delete_user(user_id):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    user = User.query.filter_by(id=user_id).first()
    if user.admin:
        flash(f"{user.display_name} is an admin and can't be removed")
        return redirect(url_for('users.edit_users'))

    user.active = False
    db.session.commit()
    flash(f"{user.display_name} has been sent to the bin")

    return redirect(url_for('users.edit_users'))



@bp.route('/users/edit/admin/<int:user_id>')
@login_required
def toggle_admin(user_id):

    if not current_user.admin:
        return redirect(url_for('core.home'))

    user = User.query.get_or_404(user_id)

    user.admin = True if not user.admin else False
    db.session.commit()

    flash(f"{user.name}'s admin status is now: {user.admin}")

    return redirect(url_for('users.edit_users'))



@bp.route('/users/edit-user/<int:user_id>', methods=['GET', 'POST'])
@login_required
def edit_user(user_id):

    user = User.query.get_or_404(user_id)

    if current_user.id != user.id and not current_user.admin:
        flash("Invalid Permission")
        return redirect(url_for('core.home'))

    form = EditUserForm()

    if form.validate_on_submit():
        user.change_name(form.name.data)
        user.email = form.email.data
        session['name'] = ""
        session['email'] = ""
        db.session.commit()
        flash(f"'{user.name}' has been updated")

        if current_user.admin:
            return redirect(url_for('dashboard.admin'))

        return redirect(url_for('core.home'))

    elif request.method == "GET":
        form.name.data = session['name'] = user.name
        form.email.data = session['email'] = user.email


    return render_template('create_user.html', title=f"Edit {user.name.split(' ')[0]}",
                            user=user, form=form, edit=True)
