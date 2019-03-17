from .. import all_module as am
from .transaction import record_transaction

accounts_bp = am.Blueprint('accounts_bp', __name__)


@accounts_bp.route('/accounts/open', methods=['POST'])
@am.jwt_required
def open_account():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data received'}), 400

    try:
        alias = data['alias']
        acc_type = data['type']
        deposit = data['deposit']
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    current_user = am.get_jwt_identity()['username']
    account_num = am.get_account_num(acc_type)
    am.clients.update_one(
        {'username': current_user},
        {
            '$push':
            {
                'accounts': {
                    'account_number': account_num,
                    'alias': alias,
                    'balance': deposit,
                    'type': acc_type,
                    'active': True
                }
            }
        }
    )

    if deposit:
        record_transaction(current_user, acc_type, deposit)

    return am.jsonify({'msg': 'Account created', 'account_number':
                      account_num}), 201


@accounts_bp.route('/accounts/close/<string:account_num>', methods=['DELETE'])
@am.jwt_required
def close_account(account_num):

    if not am.verify(account_num):
        return am.jsonify({'msg': 'Invalid account number checksum'}), 422

    current_user = am.get_jwt_identity()['username']

    pre_update = am.clients.find_one_and_update(
        {'username': current_user},
        {
            '$pull': {
                'accounts': {'account_number': account_num}
            }
        }
    )
    exist = next((index for (index, d) in enumerate(pre_update['accounts'])
                  if d['account_number'] == account_num), None)

    if not exist:
        return am.jsonify({'msg': f'User {current_user} does not own '
                          f'account: {account_num}'}), 409

    return am.jsonify({'msg': f'Account {account_num} closed'}), 200
