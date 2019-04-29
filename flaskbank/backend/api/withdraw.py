from .. import all_module as am
from .utils import withdraw

withdraw_bp = am.Blueprint('withdraw', __name__)


@withdraw_bp.route('/withdraw', methods=['POST'])
@am.jwt_required
def withdraw_route():
    data = am.request.get_json()
    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        amount = data['amount']
        acc_num = str(data['account_number'])
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    if (not isinstance(amount, float) and not isinstance(amount, int)) or not \
            isinstance(acc_num, str):
        return am.jsonify({'msg': 'Invalid Input'}), 400

    if not am.verify(acc_num) or not acc_num:
        return am.jsonify({'msg': 'invalid/empty account number'}), 400

    current_user = am.get_jwt_identity()['username']
    post_update_client = withdraw(current_user, acc_num, amount,
                                  'Cash withdraw')
    if not post_update_client:
        return am.jsonify({'msg': 'Withdraw declined'}), 400

    post_acc = next(acc for acc in post_update_client[
        'accounts'] if acc['account_number'] == str(acc_num))
    ending_balance = post_acc['balance']
    acc_type = post_acc['type']
    return am.jsonify({'username': current_user, 'amount': amount * -1,
                       'account_type': acc_type,
                       'ending_balance': float(ending_balance.to_decimal()),
                       'account_number': acc_num}), 200
