from .. import all_module as am
withdraw_bp = am.Blueprint('withdraw', __name__)


@withdraw_bp.route('/withdraw', methods=['POST'])
@am.jwt_required
def withdraw():
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
                                   {'$inc': {'accounts.$.balance': amount * -1}})

    return am.jsonify({'username': current_user, 'amount': amount * -1, 'account_type': account_type}), 200


