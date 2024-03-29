from config import Config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_moment import Moment

app = Flask(__name__)

#-------------------
#---- CONFIGURE ----
#-------------------

app.config.from_object(Config)


moment = Moment(app)


#------------------------
#---- DATABASE SETUP ----
#------------------------

db = SQLAlchemy(app)
Migrate(app, db, render_as_batch=True)


#-----------------------------
#---- LOGIN MANAGER SETUP ----
#-----------------------------

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'users.login'


#-------------------------
#---- BLUEPRINT SETUP ----
#-------------------------

from mattsmentalhealthpoetry.core.views import bp as core
from mattsmentalhealthpoetry.users.views import bp as users
from mattsmentalhealthpoetry.poems.views import bp as poems
from mattsmentalhealthpoetry.dashboard.views import bp as dashboard
# from mattsmentalhealthpoetry.error_pages.handlers import bp as error_pages

app.register_blueprint(core)
app.register_blueprint(users)
app.register_blueprint(poems)
app.register_blueprint(dashboard)
# app.register_blueprint(error_pages)
