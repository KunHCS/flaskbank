"""
Initialization for flask server
"""
from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from .config import DevelopmentConfig
from flask_jwt_extended import JWTManager
from flask_cors import CORS
# from flask_talisman import Talisman

mongo = PyMongo()
bcrypt = Bcrypt()
f_jwt = JWTManager()
cors = CORS()
# talisman = Talisman()


def create_app(current_config=DevelopmentConfig):
    app = Flask(__name__, static_folder=current_config.STATIC_PATH,
                template_folder=current_config.TEMPLATE_PATH)
    app.config.from_object(current_config)

    mongo.init_app(app)
    bcrypt.init_app(app)
    f_jwt.init_app(app)
    cors.init_app(app)

    # Blueprints
    from flaskbank.backend.api import API_BLUEPRINTS
    from flaskbank.backend.main.routes import main_bp

    for bp in API_BLUEPRINTS:
        app.register_blueprint(bp, url_prefix='/api')

    app.register_blueprint(main_bp)

    from .api.autopay import scheduler
    scheduler.start()

    return app
