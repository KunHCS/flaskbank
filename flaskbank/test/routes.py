"""
Testing route
"""
from flask import Blueprint
from flaskbank import bcrypt
from flaskbank.model import clients

test = Blueprint('test', __name__)


@test.route('/', methods=['GET', 'POST'])
def test_main():

    return '<h1>This is the test route</h1>' \
           '<a href="./db-insert">Test data insertion</a><br>' \
           '<a href="./db-update">Test data update</a><br>' \
           '<a href="./db-delete">Test data deletion</a><br>'


@test.route('/db-insert', methods=['GET', 'POST'])
def db_insert():
    if not clients.find_one({'username': 'dummy'}):
        clients.insert_one({
            'name': {'first': 'Yummy', 'middle': '', 'last': 'Dummy'},
            'username': 'dummy',
            'password': bcrypt.generate_password_hash('abc123'.encode(
                'utf-8')),
            'accounts': {'checking': [1234567], 'saving': [7654321]}
        })

    return '<h1>Inserted dummy users into database</h1>'


@test.route('/db-update', methods=['GET', 'POST'])
def db_update():
    # ex. new checking account
    clients.update_one({'username': 'dummy'},
                       {'$push': {'accounts.checking': 9999999}})

    return '<h1>Updated dummy user in database</h1>'


@test.route('/db-delete', methods=['GET', 'POST'])
def db_delete():

    clients.delete_one({'username': 'dummy'})

    return '<h1>Deleted dummy user from database</h1>'


