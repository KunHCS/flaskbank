from .. import all_module as am
from pymongo import ReturnDocument

utils_bp = am.Blueprint('Utilities API', __name__)


def record_transaction(username, account_num, amount):
    """
    Record transaction history
    :param username:
    :param account_num:
    :param amount:
    :return:
    """
    time = am.datetime.now().strftime('%c')
    am.clients.update_one(
        {'username': username, 'accounts.account_number': str(account_num)},
        {'$push': {
            'accounts.$.transactions': {
                '$each': [{
                    'time': time,
                    'amount': amount
                }],
                '$position': 0}
        }}
    )


def deposit(user, account_number, amount):
    """
    deposit amount to account
    :param user:
    :param account_number:
    :param amount:
    :return: (dict) updated client
    """
    round_amount = (round(abs(amount), 2))
    client = am.clients.find_one_and_update(
        {'username': user, 'accounts.account_number': str(account_number)},
        {'$inc': {'accounts.$.balance': round_amount}},
        return_document=ReturnDocument.AFTER)
    if client:
        record_transaction(user, account_number, round_amount)
    return client


def withdraw(user, account_number, amount):
    """
    withdraw amount from user account
    :param user:
    :param account_number:
    :param amount:
    :return:
    """
    round_amount = round(abs(amount) * -1, 2)
    client = am.clients.find_one_and_update({
        'username': user,
        'accounts.account_number': str(account_number)},
        {'$inc': {'accounts.$.balance': round_amount}},
        return_document=ReturnDocument.AFTER)

    if client:
        record_transaction(user, account_number, round_amount)
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
