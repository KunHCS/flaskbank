from .. import all_module as am
from .utils import make_json_serializable, make_serializable
from datetime import datetime

get_client_bp = am.Blueprint('get client info', __name__)

allowed_endpoints = ('/all', '/accounts', '/contact',
                     '/id')


@get_client_bp.route('/client/<string:endpoint>', methods=['GET'])
@am.jwt_required
def client_detail(endpoint):
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'_id': False, 'password': False})

    make_json_serializable(client)
    if endpoint == 'all':
        return am.jsonify(client), 200
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


@get_client_bp.route('/client/transaction/all/<int:year>/<int:month>',
                     methods=['GET'])
@am.jwt_required
def get_all_transactions(year, month):
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({
        'username': current_user},
        {'accounts': True,
         'accounts.account_number': True,
         'accounts.transactions': True})
    print(client)
    for item in client['accounts']:
        print(item)
        make_serializable(item)
    for account in client['accounts']:
        filtered = [trans for trans in account['transactions']
                    if datetime.strptime(trans['time'], '%c').year == year
                    and datetime.strptime(trans['time'], '%c').month == month]
        account['transactions'] = filtered
    return am.jsonify({'accounts': client['accounts']})


@get_client_bp.route('/client/transaction/<int:account>',
                     defaults={'month': None, 'year': None}, methods=['GET'])
@get_client_bp.route('/client/transaction/<int:account>/<int:year>',
                     defaults={'month':  None}, methods=['GET'])
@get_client_bp.route('/client/transaction/<int:account>/<int:year>/<int'
                     ':month>', methods=['GET'])
@am.jwt_required
def get_transaction(account, year, month):
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({
        'username': current_user,
        'accounts.account_number': str(account)},
        {'accounts': {'$elemMatch': {'account_number': str(account)}},
         'accounts.transactions': True})
    transactions_list = client['accounts'][0]['transactions']

    for item in transactions_list:
        make_serializable(item)

    if not year and not month:
        return am.jsonify({'transactions': transactions_list}), 200

    filtered = [trans for trans in transactions_list
                if datetime.strptime(trans['time'], '%c').year == year]
    if year and not month:
        print(filtered)
        return am.jsonify({'transactions': filtered}), 200
    if year and month:
        result = [trans for trans in filtered
                  if datetime.strptime(trans['time'], '%c').month == month]
        return am.jsonify({'transactions': result}), 200
    return f'{year}, {month}', 200
