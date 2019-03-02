"""
Configuration values for flask
"""
from pathlib import Path

db_name = 'bank_database'


class Config:
    FLASK_ENV = 'development'
    SECRET_KEY = 'dev'
    TEMPLATE_PATH = Path('../react-app/build')
    STATIC_PATH = Path('../react-app/build/static')
    MONGO_URI = 'mongodb://admin:admin@bank-cluster-shard-00-00-su85m' \
                '.mongodb.net:27017,' \
                'bank-cluster-shard-00-01-su85m.mongodb.net:27017,' \
                'bank-cluster-shard-00-02-su85m.mongodb.net:27017' \
                f'/{db_name}?ssl=true&replicaSet=Bank-Cluster-shard-0' \
                '&authSource=admin&retryWrites=true'
