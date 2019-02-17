from flask import request, render_template, Blueprint

manager = Blueprint('manager', __name__)


@manager.route('/')
def welcome():
    return '<h1>YOU HAVE REACHED THE MANAGER</h1>'

