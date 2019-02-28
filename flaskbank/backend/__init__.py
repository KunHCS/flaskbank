"""
Initialization for flask server
"""
from flask import Flask
from flask_bcrypt import Bcrypt
from flaskbank.backend.config import Config
from flask_pymongo import PyMongo

mongo = PyMongo()
bcrypt = Bcrypt()


def create_app():
    app = Flask(__name__, static_folder=Config.STATIC_PATH,
                template_folder=Config.TEMPLATE_PATH)

    app.config.from_object(Config)

    mongo.init_app(app)
    bcrypt.init_app(app)

    # Blueprints

    from flaskbank.backend.main.routes import main
    # from flaskbank.backend.api.routes import web_api
    from flaskbank.backend.api.register import register

    app.register_blueprint(register)
    app.register_blueprint(main)

    return app
