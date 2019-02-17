"""
API routes
"""
from flask import request, render_template, Blueprint

web_api = Blueprint('web_api', __name__)


@web_api.route('/')
def test():
    return render_template('index.html', token=__name__)




