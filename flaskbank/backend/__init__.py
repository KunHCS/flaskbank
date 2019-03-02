"""
Initialization for flask server
"""
from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from .config import Config

mongo = PyMongo()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__, static_folder=Config.STATIC_PATH,
                template_folder=Config.TEMPLATE_PATH)

    app.config.from_object(Config)

    mongo.init_app(app)
    bcrypt.init_app(app)

    # Blueprints
    from flaskbank.backend.api import API_BLUEPRINTS
    from flaskbank.backend.main.routes import main_bp

    for bp in API_BLUEPRINTS:
        app.register_blueprint(bp, url_prefix='/api')

    app.register_blueprint(main_bp)

    return app
