from .. import all_module as am
from .transaction import record_transaction
import random
from pymongo import ReturnDocument

deposit_bp = am.Blueprint('deposit', __name__)


def deposit(user, account_number, amount):
    """
    deposit amount to account
    :param user:
    :param account_number:
    :param amount:
    :return: (dict) updated client
    """
    round_amount = round(amount, 2)
    client = am.clients.find_one_and_update(
        {'username': user, 'accounts.account_number': account_number},
        {'$inc': {'accounts.$.balance': round_amount}},
        return_document=ReturnDocument.AFTER)
    if client:
        acc_type = next(acc for acc in client['accounts'] if acc[
            'account_number'] == account_number)['type']
        record_transaction(user, acc_type, round_amount)
    return client


@deposit_bp.route('/deposit', methods=['POST'])
@am.jwt_required
def deposit_route():
    data = am.request.get_json()

    if not data:
        return am.make_response("Bad Request, no data passed", 400)

    try:
        amount = data['amount']
        account_type = data['type']
    except KeyError:
        return am.make_response('Bad Request, missing/misspelled key', 400)

    current_user = am.get_jwt_identity()['username']
    am.clients.find_one_and_update(
        {'username': current_user, 'accounts.type': account_type},
        {'$inc': {'accounts.$.balance': amount}})

    record_transaction(current_user, account_type, amount)
    return am.jsonify({'username': current_user, 'amount': amount,
                       'account_type': account_type}), 200


@deposit_bp.route('/deposit/check', methods=['POST'])
@am.jwt_required
def check_deposit():
    current_user = am.get_jwt_identity()['username']
    allowed_extension = ('.png', '.jpg', '.jpeg')
    file = am.request.files.get('image')
    account = am.request.form['account']
    deposit_amount = round(random.uniform(50, 501), 2)  # fake amount
    if not file or not file.filename.lower().endswith(allowed_extension):
        return am.jsonify({'msg': 'No file or invalid file type. File '
                                  'must be an images in .png .jpg .jpeg '
                                  'format'}), 400

    client = deposit(current_user, account, deposit_amount)
    if not client:
        return am.jsonify({'msg': 'User does not own the account'}), 400
    return am.jsonify({'msg': f'Deposited {deposit_amount:.2f}'}), 200
