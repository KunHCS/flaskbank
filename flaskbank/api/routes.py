"""
API routes
"""
from flask import request, render_template, Blueprint

web_api = Blueprint('web_api', __name__)


@web_api.route('/')
def test():
    return '<h1>YOU HAVE REACHED THE WEB API!</h1>'




