from .. import all_module as am
from .utils import withdraw, deposit

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

    from_description = f'Transfer to {account_to[-4:]}'
    acc_from = withdraw({'$exists': True}, account_from, amount,
                        from_description)

    to_description = f'Transfer from {account_from[-4:]}'
    acc_to = deposit({'$exists': True}, account_to, amount, to_description)

    return am.jsonify(
        {'from': account_from, 'to': account_to, 'amount': amount}), 200
