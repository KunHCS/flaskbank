"""
Database initialization
"""
from flaskbank.backend import mongo
clients = mongo.db.clients
clients.create_index([("username", 'text')], unique=True)
managers = mongo.db.managers

