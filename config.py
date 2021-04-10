import os
from
# from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
# load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # SQLITE SET UP #
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    #     'sqlite:///' + os.path.join(basedir, 'data.db')

    ENV = 'dev'

    if ENV == 'dev':
        app.debug = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:prologe@localhost/phoenix-poetry'
    else:
        app.debug = False
        app.config['SQLALCHEMY_DATABASE_URI'] = ''

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'data.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
