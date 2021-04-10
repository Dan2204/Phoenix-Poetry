from flask import Blueprint

bp = Blueprint('core', __name__)

from mattsmentalhealthpoetry.core import views
