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


def deposit(user, account_number, deposit_amount, description=None):
    """
    deposit amount to account
    :param user:
    :param account_number:
    :param deposit_amount:
    :param description:
    :return: (dict) updated client
    """
    amount = float(deposit_amount)
    if am.verify(str(account_number)) and str(account_number)[0] == '4':
        neg_d128_amount = to_d128(abs(amount) * -1)
        d128_amount = to_d128(abs(amount))
        client = am.clients.find_one_and_update({
            'username': user,
            'accounts.account_number': str(account_number)},
            {'$inc': {'accounts.$.balance': neg_d128_amount,
                      'accounts.$.available_credit': d128_amount}},
            return_document=ReturnDocument.AFTER)
    else:
        d128_amount = to_d128(abs(amount))
        client = am.clients.find_one_and_update(
            {'username': user, 'accounts.account_number': str(account_number)},
            {'$inc': {'accounts.$.balance': d128_amount}},
            return_document=ReturnDocument.AFTER)
    if client:
        record_transaction(user, account_number, d128_amount, description)
    return client


def withdraw(user, account_number, withdraw_amount, description=None):
    """
    withdraw amount from user account
    :param user:
    :param account_number:
    :param withdraw_amount:
    :param description:
    :return:
    """
    amount = float(withdraw_amount)
    # if account is credit account
    client = am.clients.find_one({
        'username': user,
        'accounts.account_number': str(account_number)},
        {'accounts': {'$elemMatch': {'account_number': str(account_number)}}})
    if not client:
        return am.jsonify({'msg': 'account not found'})
    current_balance = float(client['accounts'][0]['balance'].to_decimal())
    available_credit = client['accounts'][0].get('available_credit', None)
    available_credit = (float(available_credit.to_decimal()) if
                        available_credit else None)
    print(available_credit)
    if (current_balance - amount) < 0.0 and str(account_number)[0] != '4':
        return False
    elif str(account_number)[0] == '4' and ((available_credit - amount) <
                                            -100.0):
        return False

    print(client['accounts'][0]['balance'])
    if am.verify(str(account_number)) and str(account_number)[0] == '4':
        d128_amount = to_d128(abs(amount) * -1)
        pos_d128 = to_d128(abs(amount))
        client = am.clients.find_one_and_update({
            'username': user,
            'accounts.account_number': str(account_number)},
            {'$inc': {'accounts.$.balance': pos_d128,
                      'accounts.$.available_credit': d128_amount}},
            return_document=ReturnDocument.AFTER)
    else:

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
