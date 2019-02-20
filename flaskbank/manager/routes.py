"""
Manager routes
"""
from flask import Blueprint

manager = Blueprint('manager', __name__)


@manager.route('/')
def welcome():
    return '<h1>Manager Route</h1>'

