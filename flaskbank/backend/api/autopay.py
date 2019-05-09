from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.mongodb import MongoDBJobStore
from .. import mongo
from .. import all_module as am
from .utils import deposit, withdraw
from datetime import datetime
import hashlib as hl

autopay_bp = am.Blueprint('autopay', __name__)

scheduler = BackgroundScheduler(
    jobstores={'mongo': MongoDBJobStore(client=mongo.cx)})


def add_autopay(client, from_acc, to_acc, amount):
    if not withdraw(client, from_acc, amount, f'autopay to {to_acc[-4:]}') or \
            not deposit(client, to_acc, amount,
                        f'autopay from {from_acc[-4:]}'):
        print('autopay failed', datetime.now())
        return
    print(f'autopay success {from_acc} to {to_acc} for ${amount}',
          datetime.now())


@autopay_bp.route('/autopay', methods=['POST'])
@am.jwt_required
def autopay_route():
    current_user = am.get_jwt_identity()['username']
    data = am.request.get_json()
    try:
        from_acc = data['from']
        to_acc = data['to']
        amount = data['amount']
        interval = data['interval']
    except KeyError:
        return am.jsonify({'msg': 'missing/misspelled key'}), 400
    if not am.verify(from_acc) or not am.verify(to_acc):
        return am.jsonify({'msg': 'invalid account number'}), 400

    from_account = am.clients.find_one({'username': current_user,
                                        'accounts.account_number':
                                            str(from_acc)},
                                       {'accounts.$': True})
    if float(from_account['accounts'][0]['balance'].to_decimal())-amount <= 0:
        return am.jsonify({'msg': 'Not enough balance'}), 409

    if not am.clients.find_one({'accounts.account_number': from_acc}) or \
            not am.clients.find_one({'accounts.account_number': to_acc}):
        return am.jsonify({'msg': 'account does not exist'}), 400
    amount = round(amount, 2)
    exist = am.clients.find_one({'$and': [{'username': current_user},
                                          {'auto_pay.from': from_acc}]},
                                {'auto_pay': {'$elemMatch': {
                                    'from': from_acc}}})
    if exist:
        print(exist)
        scheduler.remove_job(exist['auto_pay'][0]['job_id'], jobstore='mongo')
        am.clients.update_one({'username': current_user},
                              {'$pull': {'auto_pay': {'from': from_acc}}})

    client = am.clients.find_one({'username': current_user})
    jobs = client.get('auto_pay', [])

    check = hl.md5((from_acc + to_acc + str(amount)).encode()).hexdigest()
    print(check)
    for job in jobs:
        if job['check'] == check:
            return am.jsonify({'msg': 'autopay already exist'}), 409

    job_name = f'autopay ${amount:.2f} from {from_acc} to {to_acc} every ' \
        f'{interval} minutes'

    job = scheduler.add_job(add_autopay, 'interval', minutes=interval,
                            name=job_name,
                            jobstore='mongo',
                            args=(current_user, from_acc, to_acc, amount),
                            replace_existing=True)
    print(job.name, job.id)
    am.clients.update_one(
        {'username': current_user},
        {'$push': {'auto_pay': {
            'job_name': job.name,
            'job_id': job.id,
            'from': from_acc,
            'to': to_acc,
            'check': check,
            'amount': amount
        }}}
    )
    return am.jsonify({'msg': f'{job.name} created', 'id': job.id}), 201


@autopay_bp.route('/autopay/get', methods=['GET'])
@am.jwt_required
def get_autopay():
    current_user = am.get_jwt_identity()['username']
    jobs = am.clients.find_one({'username': current_user},
                               {'auto_pay': True})
    jobs.pop('_id')
    if not jobs:
        return am.jsonify({'msg': 'no autopay active'}), 409
    return am.jsonify(jobs), 200


# update to remove from specific user
@autopay_bp.route('/autopay/stop', methods=['DELETE'])
@am.jwt_required
def remove_autopay():
    current_user = am.get_jwt_identity()['username']
    pre_update = am.clients.find_one_and_update(
        {'username': current_user},
        {'$unset': {'auto_pay': ''}}
    )
    jobs = pre_update.get('auto_pay', None)
    if not jobs:
        return am.jsonify({'msg': 'No autopay set up'})

    for job in jobs:
        scheduler.remove_job(job['job_id'], jobstore='mongo')

    return am.jsonify({'msg': 'autopay removed for user'}), 200


# update to remove from specific user
@autopay_bp.route('/autopay/remove', methods=['DELETE'])
def remove_autopay_route():
    scheduler.remove_all_jobs()
    am.clients.update_many(
        {'username': {'$exists': True}},
        {'$unset': {'auto_pay': ''}}
    )
    return am.jsonify({'msg': 'autopay removed from all user (for now)'}), 200
