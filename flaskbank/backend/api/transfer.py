from .. import all_module as am
from .transaction import record_transaction

transfer_bp = am.Blueprint('transfer', __name__)


@transfer_bp.route('/transfer', methods=['POST'])
def transfer():
    data = am.request.get_json()

    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        account_from = data['account_from']
        account_to = data['account_to']
        amount = data['amount']
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    # current_user = am.get_jwt_identity()['username']
    am.clients.find_one_and_update({'accounts.account_number': account_from},
                                   {'$inc': {'accounts.$.balance': amount * -1}})

    am.clients.find_one_and_update({'accounts.account_number': account_to},
                                   {'$inc': {'accounts.$.balance': amount}})

    account_type_from = am.clients.find_one({'accounts.account_number': account_from}, {'accounts.$': 1,
                                                                                '_id': 0})['accounts'][0]['type']
    user_to = am.clients.find_one({'accounts.account_number': account_to}, {'accounts.$': 1,
                                                                                '_id': 0})

    print('from', account_type_from)
    print('++++++++++++++++++++')
    print('to', user_to)


    # record_transaction(current_user, account_type, amount)
    return am.jsonify({'from': account_from, 'to': account_to, 'amount': amount}), 200
