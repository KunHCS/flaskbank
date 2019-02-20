"""
Client routes
"""
from flask import Blueprint

client = Blueprint('client', __name__)


@client.route('/')
def welcome():
    return '<h1>Client Route</h1>'
