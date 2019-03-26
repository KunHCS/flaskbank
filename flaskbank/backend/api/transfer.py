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

    acc_from = am.clients.find_one_and_update({'accounts.account_number': account_from},
                                   {'$inc': {'accounts.$.balance': amount * -1}})

    acc_to = am.clients.find_one_and_update({'accounts.account_number': account_to},
                                   {'$inc': {'accounts.$.balance': amount}})

    acc_type_from = next(acc for acc in acc_from['accounts'] if
                         acc['account_number'] == account_from)['type']

    acc_type_to = next(acc for acc in acc_to['accounts'] if
                         acc['account_number'] == account_to)['type']

    record_transaction(acc_from['username'], acc_type_from, amount*-1)
    record_transaction(acc_to['username'], acc_type_to, amount)

    return am.jsonify({'from': account_from, 'to': account_to, 'amount': amount}), 200
