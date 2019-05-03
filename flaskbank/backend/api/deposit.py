from .. import all_module as am
from .utils import deposit
import re

deposit_bp = am.Blueprint('deposit', __name__)


@deposit_bp.route('/deposit', methods=['POST'])
@am.jwt_required
def deposit_route():
    data = am.request.get_json()

    if not data:
        return am.make_response("Bad Request, no data passed", 400)
    try:
        amount = data['amount']
        acc_num = str(data['account_num'])
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    if (not isinstance(amount, float) and not isinstance(amount, int)) or not \
            isinstance(acc_num, str):
        return am.jsonify({'msg': 'Invalid Input'}), 400

    if not am.verify(acc_num) or not acc_num:
        return am.jsonify({'msg': 'invalid/empty account number'}), 400

    current_user = am.get_jwt_identity()['username']
    description = 'Bill pay' if acc_num[0] == '4' else 'Cash deposit'
    post_update_client = deposit(current_user, acc_num, amount, description)

    if not post_update_client:
        return am.jsonify({'msg': 'client does not own the account'}), 400
    post_account = next(acc for acc in post_update_client[
        'accounts'] if acc['account_number'] == str(acc_num))
    ending_balance = post_account['balance']
    acc_type = post_account['type']
    return am.jsonify({'username': current_user, 'amount': amount,
                       'account_type': acc_type,
                       'ending_balance': float(ending_balance.to_decimal()),
                       'account_number': acc_num}), 200


@deposit_bp.route('/deposit/check', methods=['POST'])
@am.jwt_required
def check_deposit():
    current_user = am.get_jwt_identity()['username']
    allowed_extension = ('.png', '.jpg', '.jpeg')
    file = am.request.files.get('image')
    account = str(am.request.form['account'])
    if not am.verify(account):
        return am.jsonify({'msg': 'invalid account number'}), 400

    amount = am.request.form['amount']
    amount = amount[:64]
    try:
        amount = float(amount)
    except ValueError:
        return am.jsonify({'msg': ' Invalid amount'}), 400
    # if not isinstance(amount, float) and not isinstance(amount, int):
    #     return am.jsonify({'msg': 'invalid number'}), 400

    deposit_amount = round(amount, 3)
    if not file or not file.filename.lower().endswith(allowed_extension):
        return am.jsonify({'msg': 'No file or invalid file type. File '
                                  'must be an images in .png .jpg .jpeg '
                                  'format'}), 400

    client = deposit(current_user, account, deposit_amount, 'Check deposit')
    if not client:
        return am.jsonify({'msg': 'User does not own the account'}), 400
    return am.jsonify({'msg': f'Deposited {deposit_amount:.2f}'}), 200
