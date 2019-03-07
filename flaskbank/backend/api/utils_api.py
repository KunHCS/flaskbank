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
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    am.clients.delete_one({'username': username})
    return am.jsonify({'user': username + ' is deleted'}), 200
