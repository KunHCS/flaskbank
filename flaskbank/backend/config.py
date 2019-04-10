"""
Configuration values for flask
"""
from pathlib import Path
import os


class Config:
    DEBUG = False
    TESTING = False
    TEMPLATE_PATH = Path('../react-app/build')
    STATIC_PATH = Path('../react-app/build/static')
    DB_NAME = 'bank_database'
    MONGO_URI = 'mongodb+srv://admin:admin@bank-cluster-su85m.mongodb.net' \
                f'/{DB_NAME}?retryWrites=true'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    # MONGO_URI = 'mongodb://admin:admin@bank-cluster-shard-00-00-su85m' \
    #             '.mongodb.net:27017,' \
    #             'bank-cluster-shard-00-01-su85m.mongodb.net:27017,' \
    #             'bank-cluster-shard-00-02-su85m.mongodb.net:27017' \
    #             f'/{db_name}?ssl=true&replicaSet=Bank-Cluster-shard-0' \
    #             '&authSource=admin&retryWrites=true'


class DevelopmentConfig(Config):
    DEBUG = True
    SECRET_KEY = 'dev'


class ProductionConfig(Config):
    __secret = 'fUjXn2r5u8x/A?D(G+KaPdSgVkYp3s6v'
    SECRET_KEY = os.environ.get('SECRET_KEY', __secret)
    MONGO_URI = os.environ.get('MONGO_URI', Config.MONGO_URI)


class TestConfig(Config):
    TESTING = True
    SECRET_KEY = 'test'

