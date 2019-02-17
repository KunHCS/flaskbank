from flask import request, render_template, Blueprint

client = Blueprint('client', __name__)


@client.route('/')
def welcome():
    return '<h1>Welcome to hell</h1>'
