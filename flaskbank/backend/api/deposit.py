from .. import all_module as am
deposit_bp = am.Blueprint('deposit', __name__)


@deposit_bp.route('/deposit', methods=['POST'])
@am.jwt_required
def deposit():
    data = am.request.get_json()

    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        amount = data['amount']
        account_type = data['type']
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    current_user = am.get_jwt_identity()['username']
    am.clients.find_one_and_update({'username': current_user, 'accounts.type': account_type},
                                   {'$inc': {'accounts.$.balance': amount}})

    return am.jsonify({'username': current_user, 'amount': amount, 'account_type': account_type}), 200
