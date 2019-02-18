"""
Main routes
"""
from flask import render_template, Blueprint
from flaskbank import bcrypt
from flaskbank.model import clients

main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', token=__name__)


