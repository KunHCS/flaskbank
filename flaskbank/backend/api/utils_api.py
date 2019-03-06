from .. import all_module as am
utils_bp = am.Blueprint('Utilities API', __name__)


@utils_bp.route('/utils/!CLEAR-CLIENTS', methods=['DELETE'])
def clear_db():
    am.clients.delete_many({})
    return am.make_response('ALL CLIENTS DELETED', 200)


@utils_bp.route('/utils/!CLEAR_ONE_CLIENTS', methods=['DELETE'])
def delete_one_client():
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

    am.clients.remove({'username': username})
    return am.jsonify({'user': username + ' is deleted'}), 200
