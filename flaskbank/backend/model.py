"""
Database initialization
"""
from . import mongo
import pymongo

clients = mongo.db.clients
clients.create_index([("username", 'text')], unique=True)

uniqueID_db = mongo.db.unique_counter
uniqueID_db.create_index([('id', 'text')], unique=True)

try:
    uniqueID_db.insert_one({
        'id': 'account_number',
        'count': 1000000
    })
except pymongo.errors.DuplicateKeyError as e:
    print('Initialized')


def get_next_id(key):
    new_id = uniqueID_db.find_one_and_update(
        {'id': key},
        {'$inc': {'count': 1}}
    )
    return new_id['count']

