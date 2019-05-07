from .. import all_module as am
from .utils import to_d128, deposit

register_bp = am.Blueprint('register', __name__)


@register_bp.route('/register', methods=['POST'])
def register_user():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data passed'}), 400

    try:
        first = data["first_name"].lower()
        last = data["last_name"].lower()
        email = data["email"].lower()
        username = data["username"]
        password = data['password']
        user_type = data.get('user_type', 'client')

    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    # validation
    if not isinstance(first, str) or not isinstance(last, str) or \
            not isinstance(email, str) or not isinstance(username, str) or \
            not isinstance(password, str) or not isinstance(user_type, str):
        return am.jsonify({'msg': 'Invalid Input'}), 400

    deposit_saving = data.get('deposit_saving', 0.0)
    deposit_checking = data.get('deposit_checking', 0.0)

    if not deposit_saving:
        deposit_saving = 0.0
    if not deposit_checking:
        deposit_checking = 0.0

    if user_type != 'client' and user_type != 'manager':
        return am.jsonify({'msg': 'invalid user type'}), 400

    if not am.clients.find_one({"username": username}):
        new_checking = am.get_account_num('checking')
        new_saving = am.get_account_num('saving')
        am.clients.insert_one({
            'first_name': first,
            'last_name': last,
            'username': username,
            'email': email,
            'password': am.bcrypt.generate_password_hash(password.encode(
                'UTF-8')),
            'user_type': user_type,
            'accounts': [
                {
                    'account_number': new_checking,
                    'alias': 'Checking Account',
                    'balance': to_d128(0.0),
                    'type': 'checking',
                    'active': True,
                    'transactions': []
                },
                {
                    'account_number': new_saving,
                    'alias': 'Saving Account',
                    'balance': to_d128(0.0),
                    'type': 'saving',
                    'active': True,
                    'transactions': []
                },
                {
                    'account_number': am.get_account_num('credit'),
                    'alias': 'Credit Card Account',
                    'balance': to_d128(0),
                    'available_credit': to_d128(5000.00),
                    'credit_limit': to_d128(5000.00),
                    'type': 'credit',
                    'active': True,
                    'transactions': []
                }
            ]
        })
        if deposit_saving:
            deposit(username, new_saving, deposit_saving, 'Initial deposit')
        if deposit_checking:
            deposit(username, new_checking, deposit_checking,
                    'Initial deposit')

        return am.jsonify({'msg': 'User Registered'}), 201

    return am.jsonify({'msg': 'Username already exist'}), 409
