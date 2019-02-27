"""
Main routes, home page
"""
from flask import render_template, Blueprint, request, make_response
from flaskbank.model import clients
from flaskbank import bcrypt

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html', token=__name__)


@main.route('/main/register', methods=['POST'])
def signup():
    data = request.get_json()
    if data:

        first = data["first_name"]
        last = data["last_name"]
        email = data["email"]
        username = data["username"]

        if not clients.find_one({"username": username}):
            clients.insert_one({
                'first_name': first,
                'last_name': last,
                'username': username,
                'email': email,
                'password': bcrypt.generate_password_hash(data[
                    "password"].encode('utf-8')),

                'accounts': {'checking': [{'account_num': 123456,
                                           'balance': 0.0,
                                           'alias': 'Checking'}],
                             'savings': [{'account_num': 234567,
                                          'balance': 0.0,
                                          'alias': 'Saving'}]}
            })
            return make_response(('Registered', 201))

    return make_response(('Username already exist', 409))

