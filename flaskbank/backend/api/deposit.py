from .. import all_module as am
import random
from .utils import deposit

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

    current_user = am.get_jwt_identity()['username']
    post_update_client = deposit(current_user, acc_num, amount, 'Cash deposit')

    if not post_update_client:
        return am.jsonify({'msg': 'client does not own the account'}), 400
    ending_balance = next(acc['balance'] for acc in post_update_client[
        'accounts'] if acc['account_number'] == str(acc_num))
    return am.jsonify({'username': current_user, 'amount': amount,
                       'ending_balance': float(ending_balance.to_decimal()),
                       'account_number': acc_num}), 200


@deposit_bp.route('/deposit/check', methods=['POST'])
@am.jwt_required
def check_deposit():
    current_user = am.get_jwt_identity()['username']
    allowed_extension = ('.png', '.jpg', '.jpeg')
    file = am.request.files.get('image')
    account = str(am.request.form['account'])
    deposit_amount = round(random.uniform(50, 501), 2)  # fake amount
    if not file or not file.filename.lower().endswith(allowed_extension):
        return am.jsonify({'msg': 'No file or invalid file type. File '
                                  'must be an images in .png .jpg .jpeg '
                                  'format'}), 400

    client = deposit(current_user, account, deposit_amount, 'Check deposit')
    if not client:
        return am.jsonify({'msg': 'User does not own the account'}), 400
    return am.jsonify({'msg': f'Deposited {deposit_amount:.2f}'}), 200
