from .. import all_module as am

get_client_bp = am.Blueprint('get client info', __name__)


@get_client_bp.route('/client/info', methods=['GET'])
@am.jwt_required
def client_info():
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'_id': False, 'password': False})
    return am.jsonify(client), 200
