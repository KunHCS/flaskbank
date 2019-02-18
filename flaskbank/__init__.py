"""
Initialization for flask server
"""
from flask import Flask
from flask_bcrypt import Bcrypt
from flaskbank.config import Config
from flask_pymongo import PyMongo


app = Flask(__name__, static_folder=Config.STATIC_PATH,
            template_folder=Config.TEMPLATE_PATH)

app.config.from_object(Config)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Blueprints (moving to top will break it)
from flaskbank.client.routes import client
from flaskbank.main.routes import main
from flaskbank.api.routes import web_api
from flaskbank.manager.routes import manager
from flaskbank.test.routes import test

app.register_blueprint(main)
app.register_blueprint(client, url_prefix='/client')
app.register_blueprint(web_api, url_prefix='/api')
app.register_blueprint(manager, url_prefix='/manager')
app.register_blueprint(test, url_prefix='/test')
