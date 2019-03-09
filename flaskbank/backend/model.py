"""
Database initialization
"""
from . import mongo
import pymongo

jti_blacklist = set()

clients = mongo.db.clients
clients.create_index([("username", pymongo.ASCENDING)], unique=True)

uniqueID_db = mongo.db.unique_counter
uniqueID_db.create_index([('id', pymongo.ASCENDING)], unique=True)

try:
    uniqueID_db.insert_one({
        'id': 'account_number',
        'count': 1000000
    })
except pymongo.errors.DuplicateKeyError as e:
    pass


def get_next_id(key):
    """
    Get the next unique id for specific key
    :param key: (string) key to access
    :return: (number) unique ID
    """
    new_id = uniqueID_db.find_one_and_update(
        {'id': key},
        {'$inc': {'count': 1}}
    )
    return new_id['count']

