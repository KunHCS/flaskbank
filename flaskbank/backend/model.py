"""
Database initialization
"""
from . import mongo
import pymongo
import random
import luhn
from functools import wraps

jti_blacklist = set()

clients = mongo.db.clients
clients.create_index([('username', pymongo.ASCENDING)], unique=True)
clients.create_index([('accounts.account_number', pymongo.ASCENDING)],
                     unique=True)

uniqueID_db = mongo.db.unique_counter
uniqueID_db.create_index([('id', pymongo.ASCENDING)], unique=True)

try:
    uniqueID_db.insert_one({
        'id': 'account_number',
        'count': 10000
    })
except pymongo.errors.DuplicateKeyError as e:
    pass


def unique_bank_account(f):
    @wraps(f)
    def wrapper(*args):
        for i in range(5):
            bank_num = f(*args)
            result = clients.find_one({'accounts.account_number': bank_num})
            if not result:
                return bank_num
        raise Exception('No unique bank number found')
    return wrapper


@unique_bank_account
def get_account_num(acc_type):
    """
    Get the next unique id for specific key
    :param acc_type: (string) key to access
    :return: (number) unique ID
    """
    checking_prefix = '2'
    saving_prefix = '3'
    credit_prefix = '4'

    new_id = uniqueID_db.find_one_and_update(
        {'id': 'account_number'},
        {'$inc': {'count': 1}}
    )
    temp = list(str(new_id['count']))
    temp.extend(list(str(random.randrange(100, 1000))))
    suffix = ''.join(random.sample(temp, k=len(temp)))
    if acc_type == 'checking':
        return luhn.append(checking_prefix + suffix)
    elif acc_type == 'saving':
        return luhn.append(saving_prefix + suffix)
    elif acc_type == 'credit':
        return luhn.append(credit_prefix + suffix)
    else:
        raise Exception('No account type specified')

