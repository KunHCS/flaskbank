from flask import jsonify, Blueprint, request, abort, Flask
import bcrypt
from pymongo import MongoClient
import uuid

# TODO change mongoDB url when deploy
client = MongoClient.MongoClient('mongodb://cp:climbing_project1@ds157574.mlab.com:57574/bank_database')
db = client['clients']

signup = Blueprint('signup', __name__)


# curl -i -X POST -H "Content-Type: application/json" -d '{"email":"miguel@gmail.com","password":"python", "user_id": "", "full_name": ""}' http://0.0.0.0:3001/signup
@signup.route('/signup', methods=['POST'])
def new_user():
    email = request.json.get('email')
    password = request.json.get('password')
    if email is None or password is None:
        abort(400)  # missing arguments

    users = db['users']
    existing_user = users.find_one({'email': email})

    if existing_user is None:
        hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users.insert({
            'email': email,
            'password': hashpass,
            'user_id': request.json.get('user_id'),
            'full_name': request.json.get('full_name'),
            'uuid': uuid.uuid4().hex
        })
        return jsonify({'ok': email}), 201

    return 'That email already exists!\n', 400

