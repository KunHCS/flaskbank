from .. import all_module as am
from pymongo import ReturnDocument

utils_bp = am.Blueprint('Utilities API', __name__)


def make_serializable(client_dict):
    """
    Convert all decimal128 to float, more generic version
    :param client_dict:
    :return:
    """
    for key in client_dict:
        if type(client_dict[key]) is am.Decimal128:
            client_dict[key] = float(client_dict[key].to_decimal())
        if type(client_dict[key]) is dict:
            make_serializable(client_dict[key])
        if type(client_dict[key]) is list:
            for item in client_dict[key]:
                make_serializable(item)


def make_json_serializable(client_dict):
    """
    Convert types to json serializable
    :param client_dict:
    :return:
    """
    for account in client_dict['accounts']:
        balance = account['balance']
        try:
            account['balance'] = float(balance.to_decimal())
        except AttributeError:
            pass
        try:
            account['credit_limit'] = float(balance.to_decimal())
        except (AttributeError, KeyError):
            pass
        transactions = account.get('transactions', [])
        for transaction in transactions:
            amount = transaction['amount']
            try:
                transaction['amount'] = float(amount.to_decimal())
            except AttributeError:
                pass
    return client_dict


def to_d128(amount):
    """
    convert amount to decimal128
    :param amount:
    :return:
    """
    round_amount = (round(amount, 2))
    d128_ctx = am.create_decimal128_context()
    with am.decimal.localcontext(d128_ctx):
        final_amount = am.Decimal128(str(round_amount))
    return final_amount


def record_transaction(username, account_num, amount, description=None):
    """
    Record transaction history
    :param username:
    :param account_num:
    :param amount:
    :param description:
    :return:
    """
    time = am.datetime.now().strftime('%c')
    transaction = {
        'time': time,
        'amount': amount
    } if not description else {
        'description': description,
        'time': time,
        'amount': amount
    }

    am.clients.update_one(
        {'username': username, 'accounts.account_number': str(account_num)},
        {'$push': {
            'accounts.$.transactions': {
                '$each': [transaction],
                '$position': 0}
        }}
    )


def deposit(user, account_number, amount, description=None):
    """
    deposit amount to account
    :param user:
    :param account_number:
    :param amount:
    :param description:
    :return: (dict) updated client
    """
    d128_amount = to_d128(abs(amount))
    client = am.clients.find_one_and_update(
        {'username': user, 'accounts.account_number': str(account_number)},
        {'$inc': {'accounts.$.balance': d128_amount}},
        return_document=ReturnDocument.AFTER)
    if client:
        record_transaction(user, account_number, d128_amount, description)
    return client


def withdraw(user, account_number, amount, description=None):
    """
    withdraw amount from user account
    :param user:
    :param account_number:
    :param amount:
    :param description:
    :return:
    """
    d128_amount = to_d128(abs(amount) * -1)
    client = am.clients.find_one_and_update({
        'username': user,
        'accounts.account_number': str(account_number)},
        {'$inc': {'accounts.$.balance': d128_amount}},
        return_document=ReturnDocument.AFTER)

    if client:
        record_transaction(user, account_number, d128_amount, description)
    return client


@utils_bp.route('/utils/!CLEAR-CLIENTS', methods=['DELETE'])
def clear_db():
    am.clients.delete_many({})
    return am.jsonify({'msg': 'ALL CLIENTS DELETED'}), 200


@utils_bp.route('/utils/!CLEAR_ONE_CLIENTS/<target>', methods=['DELETE'])
def delete_one_client(target):
    result = am.clients.delete_one({'username': target})
    if result.deleted_count:
        return am.jsonify({'msg': f'user <{target}> deleted'}), 200
    return am.jsonify({'msg': f'user <{target}> does not exist'}), 409
