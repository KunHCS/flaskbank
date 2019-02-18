"""
Database initialization
"""
from flaskbank import mongo

clients = mongo.db.clients
managers = mongo.db.managers

