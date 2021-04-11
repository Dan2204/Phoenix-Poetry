from datetime import datetime
from mattsmentalhealthpoetry import db, login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from hashlib import md5


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class User(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False, unique=True, index=True)
    email = db.Column(db.String(64), nullable=False, unique=True, index=True)
    display_name = db.Column(db.String(64), index=True)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    password_hash = db.Column(db.String(128))

    poems = db.relationship('Poem', backref='user', lazy=True)

    comments = db.relationship('Comment', backref='author', lazy=True)

    def __init__(self, name, email, password, admin=False):
        self.name = name
        self.email = email
        self.admin = admin
        self.password_hash = generate_password_hash(password)
        self.set_display_name()

    def __repr__(self):
        return f"Name: {self.name}, display_name: {self.display_name}, admin:" \
            f" {self.admin}, user since: {self.creation_date}"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_display_name(self):
        self.display_name = '@' + '-'.join(self.name.lower().split(' '))

    def change_name(self, name):
        self.name = name
        self.set_display_name()

    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'


class Poem(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_modified = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False, unique=True)
    poem_image = db.Column(db.String(64), nullable=False, default='')
    published = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, nullable=False, default=True)


    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    comments = db.relationship('Comment', backref='poem', lazy=True)


    def __repr__(self):
        content_len = 10 if len(self.content) > 10 else len(self.content)
        return f"Title: {self.title}, created: {self.creation_date}, " \
            f"last modified: {self.last_modified}, content: " \
            f"{self.content[:content_len]}"

    def update_poem(self, title, content, image=''):
        self.title = title
        self.content = content
        if image:
            self.poem_image = image
        last_modified = datetime.utcnow


class Comment(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), nullable=False, index=True)
    active = db.Column(db.Boolean, nullable=False, default=False)
    approve = db.Column(db.Boolean, default=False)
    deleted = db.Column(db.Boolean, nullable=False, default=False)
    creation_date = db.Column(db.DateTime, nullable=False,
                                default=datetime.utcnow)

    poem_id = db.Column(db.Integer, db.ForeignKey('poem.id'))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


    def __repr__(self):
        return f"Comment for poem id {self.poem_id}: '{self.comment}', " \
            f"created on {self.creation_date}"
