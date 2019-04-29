from .. import all_module as am
from .utils import make_serializable
from datetime import datetime

get_client_bp = am.Blueprint('get client info', __name__)


@get_client_bp.route('/client/update', methods=['POST'])
@am.jwt_required
def client_info_update_route():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        first = data["first_name"].lower()
        last = data["last_name"].lower()
        email = data["email"].lower()
        username = data.get('username', None)
        current_password = data['current_password']
        password = data.get('password', None)
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400
    current_user = am.get_jwt_identity()['username']

    client = am.clients.find_one({'username': current_user})
    if not client:
        return am.jsonify({'msg': 'user not found'}), 409

    valid = am.bcrypt.check_password_hash(client['password'].decode('UTF-8'),
                                          current_password)
    if not valid:
        return am.jsonify({'msg': 'Incorrect Password'}), 401

    key_list = {'first_name': first, 'last_name': last, 'email': email,
                'username': username}

    for key in key_list:
        if not key_list[key]:
            key_list[key] = client[key]

    am.clients.update_one(
        {'username': current_user},
        {
            '$set': {
                'first_name': key_list['first_name'],
                'last_name': key_list['last_name'],
                'email': key_list['email'],
                'username': key_list['username']
            }
        }
    )
    extra_msg = ''
    if password:
        new_pw = am.bcrypt.generate_password_hash(password.encode('UTF-8'))
        am.clients.update_one(
            {'username': current_user},
            {'$set': {'password': new_pw}}
        )
        # jti = am.get_raw_jwt()['jti']
        # am.jti_blacklist.add(jti)
        # extra_msg = ', password changed, re-login required.'

    if username and username != client['username']:
        jti = am.get_raw_jwt()['jti']
        am.jti_blacklist.add(jti)
        extra_msg = ', username changed, re-login required.'

    return am.jsonify(
        {'msg': 'information updated successfully' + extra_msg}), 200


@get_client_bp.route('/client/accounts/balance')
@am.jwt_required
def get_account_balance():
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'accounts': True, 'accounts.balance': True,
                                  'accounts.account_number': True})
    client.pop('_id')
    make_serializable(client)
    return am.jsonify(client), 200


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
    if not client:
        return am.jsonify({'msg': 'client not found'}), 409
    for item in client['accounts']:
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
    if not client:
        return am.jsonify({'msg': 'no such account'}), 409
    transactions_list = client['accounts'][0]['transactions']

    for item in transactions_list:
        make_serializable(item)

    if not year and not month:
        return am.jsonify({'transactions': transactions_list}), 200

    filtered = [trans for trans in transactions_list
                if datetime.strptime(trans['time'], '%c').year == year]
    if year and not month:
        return am.jsonify({'transactions': filtered}), 200
    if year and month:
        result = [trans for trans in filtered
                  if datetime.strptime(trans['time'], '%c').month == month]
        return am.jsonify({'transactions': result}), 200
    return f'{year}, {month}', 200


@get_client_bp.route('/client/<string:endpoint>', methods=['GET'])
@am.jwt_required
def client_detail(endpoint):
    allowed_endpoints = ('/all', '/accounts', '/contact',
                         '/id')
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'_id': False, 'password': False})
    make_serializable(client)
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
