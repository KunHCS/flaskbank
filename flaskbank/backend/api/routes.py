"""
API routes
"""
from flask import Blueprint

web_api = Blueprint('web_api', __name__)


@web_api.route('/')
def api_home():
    return '<h1>API Route</h1>'




