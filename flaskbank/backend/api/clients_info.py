from .. import all_module as am

get_client_bp = am.Blueprint('get client info', __name__)

allowed_endpoints = ('/all', '/transactions', '/accounts', '/contact',
                     '/id')


@get_client_bp.route('/client/<string:endpoint>', methods=['GET'])
@am.jwt_required
def client_detail(endpoint):
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'_id': False, 'password': False})

    if endpoint == 'all':
        return am.jsonify(client), 200
    elif endpoint == 'transactions':
        return am.jsonify({'transactions': client['transactions']}), 200
    elif endpoint == 'accounts':
        return am.jsonify({'accounts': client['accounts']}), 200
    elif endpoint == 'contact':
        return am.jsonify({'email': client['email']}), 200
    elif endpoint == 'id':
        identity = {
            'first_name': client['first_name'],
            'last_name': client['last_name'],
            'username': client['username']
        }
        return am.jsonify(identity), 200
    else:
        return am.jsonify({'msg': f'no such endpoint /{endpoint}',
                           'allowed_endpoints': allowed_endpoints}), 400

