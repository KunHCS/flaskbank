from .. import all_module as am

login_bp = am.Blueprint('login', __name__)


@am.f_jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in am.jti_blacklist


@login_bp.route('/login', methods=['POST'])
def login_user():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        username = data['username']
        password = data['password']
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    if not isinstance(username, str) or not isinstance(password, str):
        return am.jsonify({'msg': 'Invalid input'}), 400

    user = am.clients.find_one({'username': username})

    if not user:
        return am.jsonify({'msg': 'Invalid username/password'}), 409

    valid = am.bcrypt.check_password_hash(user['password'].decode('UTF-8'),
                                          password)
    if not valid:
        return am.jsonify({'msg': 'Invalid username/password'}), 409

    token = am.create_access_token(identity={'username': username,
                                             'user_type': user['user_type']})
    return am.jsonify({'access_token': token}), 201


@login_bp.route('/reset', methods=['POST'])
def reset_password():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data passed'}), 400
    try:
        username = data['username']
        email = data['email']
        newpw = data['password']
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    client = am.clients.find_one({'$and': [{'username': username},
                                           {'email': email}]})
    if not client:
        return am.jsonify({'msg': 'invalid information'}), 409

    new_hash = am.bcrypt.generate_password_hash(newpw.encode('UTF-8'))
    result = am.clients.update_one({'username': username},
                                   {'$set': {'password': new_hash}})
    if not result.modified_count:
        return am.jsonify({'msg': 'Failed to update'}), 503

    return am.jsonify({'msg': 'password changed successful'}), 200


@login_bp.route('/logout', methods=['DELETE'])
@am.jwt_required
def logout():
    jti = am.get_raw_jwt()['jti']
    am.jti_blacklist.add(jti)
    return am.jsonify({"msg": "Successfully logged out"}), 200
