"""
Main routes, home page
"""
from flask import render_template, Blueprint

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html', token=__name__)


