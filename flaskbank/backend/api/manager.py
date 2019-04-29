from .. import all_module as am
from .utils import make_serializable
import re

manager_bp = am.Blueprint('manager', __name__)


@manager_bp.route('/manager/query/<string:attribute>/', defaults={
    'query_param': ''}, methods=['GET'])
@manager_bp.route('/manager/query/<string:attribute>/<string:query_param>',
                  methods=['GET'])
@am.jwt_required
def manager_query(attribute, query_param):
    if not query_param:
        return am.jsonify({'msg': 'Empty query'}), 422
    user_type = am.get_jwt_identity()['user_type']
    if user_type != 'manager':
        return am.jsonify({'msg': 'unauthorized'}), 401

    attributes = {'email', 'username', 'first', 'last', 'account'}
    if attribute.lower() not in attributes:
        return am.jsonify({'msg': 'Invalid query attribute'}), 400

    query = attribute
    if query == 'account':
        query = 'accounts.account_number'
    elif query == 'first':
        query = 'first_name'
    elif query == 'last':
        query = 'last_name'
    query_param = query_param.lower()
    regex = re.compile(fr'.*{query_param}.*', re.IGNORECASE)
    result = am.clients.find({query: regex}, {'_id': False,
                                              'password': False})
    out = []
    for item in result:
        if item['user_type'] != 'manager':
            make_serializable(item)
            out.append(item)

    return am.jsonify({'results': out}), 200


@manager_bp.route('/manager/get', methods=['GET'])
@am.jwt_required
def get_all_client():
    user_type = am.get_jwt_identity()['user_type']
    if user_type != 'manager':
        return am.jsonify({'msg': 'unauthorized'}), 401

    results = am.clients.find({'username': {'$exists': True}},
                              {'username': True, 'first_name': True,
                               'last_name': True, 'email': True,
                               'user_type': True})
    out = []
    for result in results:
        result.pop('_id')
        if not result['user_type'] == 'manager':
            result.pop('user_type')
            out.append(result)

    return am.jsonify({'results': out}), 200
