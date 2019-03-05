from .. import all_module as am
login_bp = am.Blueprint('login', __name__)


@login_bp.route('/login', methods=['POST'])
def login_user():
    data = am.request.get_json()
    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        username = data['username']
        password = data['password']
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    user = am.clients.find_one({'username': username})

    if not user:
        return am.make_response('Invalid username/password', 409)

    valid = am.bcrypt.check_password_hash(user['password'].decode('UTF-8'),
                                          password)
    if not valid:
        return am.make_response('Invalid username/password', 409)

    token = am.create_access_token(identity={'username': username})
    return am.jsonify({'auth_token': token}), 201
