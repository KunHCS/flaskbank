from flask import jsonify, Blueprint, request, abort, Flask
from flaskbank.backend import bcrypt
from flaskbank.backend.model import clients



# TODO change mongoDB url when deploy
client = MongoClient('mongodb://cp:climbing_project1@ds157574.mlab.com:57574/bank_database')
db = client['clients']

login = Blueprint('login', __name__)


# curl -i -X GET -H "Content-Type: application/json" -d '{"email":"miguel@gmail.com","password":"python"}' http://0.0.0.0:3001/login
@login.route('/login', methods=['GET'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    # if email is None or password is None:
    #     abort(400)  # missing arguments

    users = db['users']
    login_user = users.find_one({'email': email})

    if login_user:
        if bcrypt.hashpw(password.encode('utf-8'), login_user['password']) == \
                login_user['password']:
            return jsonify({'ok': email + ': successfully logged in.'}), 201

    return 'Invalid username or password combination\n', 400