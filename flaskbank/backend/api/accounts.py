from .. import all_module as am
from .utils import record_transaction
from .autopay import scheduler

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
    if acc_type not in ('credit', 'checking', 'saving'):
        return am.jsonify({'msg': 'Invalid Account Type'}), 400
    if acc_type == 'credit':
        client = am.clients.find_one({'$and': [{'username': current_user},
                                               {'accounts.type': 'credit'}]})
        if client:
            return am.jsonify({'msg': 'credit account already exist'}), 409

        am.clients.update_one(
            {'username': current_user},
            {
                '$push':
                    {
                        'accounts': {
                            'account_number': am.get_account_num('credit'),
                            'alias': 'Credit Card Account',
                            'balance': am.to_d128(0),
                            'available_credit': am.to_d128(5000.00),
                            'credit_limit': am.to_d128(5000.00),
                            'type': 'credit',
                            'active': True,
                            'transactions': []
                        }
                    }
            }
        )
        return am.jsonify({'msg': 'credit account opened'}), 200

    am.clients.update_one(
        {'username': current_user},
        {
            '$push':
                {
                    'accounts': {
                        'account_number': account_num,
                        'alias': alias,
                        'balance': am.to_d128(deposit),
                        'type': acc_type,
                        'active': True,
                        'transactions': []
                    }
                }
        }
    )

    if deposit:
        record_transaction(current_user, account_num, deposit, 'Initial '
                                                               'deposit')

    return am.jsonify({'msg': 'Account created',
                       'account_number': account_num,
                       'initial_deposit': deposit}), 201


@accounts_bp.route('/accounts/close/<string:account_num>', methods=['DELETE'])
@am.jwt_required
def close_account(account_num):
    if not am.verify(account_num):
        return am.jsonify({'msg': 'Invalid account number checksum'}), 422

    current_user = am.get_jwt_identity()['username']

    if account_num[0] == '4':
        pre_update = am.clients.find_one_and_update(
            {'username': current_user},
            {'$unset': {'auto_pay': ''}}
        )
        jobs = pre_update.get('auto_pay', [])
        for job in jobs:
            scheduler.remove_job(job['job_id'], jobstore='mongo')

    else:
        query = {'username': current_user,
                 'auto_pay.from': account_num}
        autopay = am.clients.find_one(query,
                                      {'auto_pay.$': True})
        if autopay:
            current_job = autopay['auto_pay'][0]
            scheduler.remove_job(current_job['job_id'], jobstore='mongo')
            am.clients.update_one(query,
                                  {'$pull': {
                                      'auto_pay': {'from': account_num}
                                  }})

    result = am.clients.update_one(
        {'username': current_user},
        {
            '$pull': {
                'accounts': {'account_number': account_num}
            }
        }
    )
    if not result.modified_count:
        return am.jsonify({'msg': 'Failed to close account'}), 409
    return am.jsonify({'msg': f'Account {account_num} closed'}), 200


@accounts_bp.route('/accounts/delete', methods=['DELETE'])
def delete_one_client():
    data = am.request.get_json()
    if not data:
        return am.jsonify({'msg': 'Bad Request, no data received'}), 400
    try:
        username = data['username']
        password = data['password']
        email = data['email']
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    client = am.clients.find_one({'username': username})
    if not client:
        return am.jsonify({'msg': 'Invalid username/password'}), 409

    valid = am.bcrypt.check_password_hash(client['password'].decode('UTF-8'),
                                          password)

    if not valid or email != client['email']:
        return am.jsonify({'msg': 'Invalid username/email/password'}), 409

    result = am.clients.delete_one({'username': username})
    if result.deleted_count:
        return am.jsonify({'msg': f'user <{username}> deleted'}), 200
    return am.jsonify({'msg': f'user <{username}> does not exist'}), 409
