from flask import request, render_template, Blueprint

main = Blueprint('main', __name__)


@main.route('/', methods=['GET', 'POST'])
def welcome():
    return render_template('index.html', name=__name__)


@main.route('/about')
def about():
    return render_template('about.html', name=__name__)

