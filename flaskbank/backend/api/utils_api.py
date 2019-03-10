from .. import all_module as am
utils_bp = am.Blueprint('Utilities API', __name__)


@utils_bp.route('/utils/!CLEAR-CLIENTS', methods=['DELETE'])
def clear_db():
    am.clients.delete_many({})
    return am.jsonify({'msg': 'ALL CLIENTS DELETED'}), 200


@utils_bp.route('/utils/!CLEAR_ONE_CLIENTS/<target>', methods=['DELETE'])
def delete_one_client(target):
    result = am.clients.delete_one({'username': target})
    if result.deleted_count:
        return am.jsonify({'msg': f'user <{target}> deleted'}), 200
    return am.jsonify({'msg': f'user <{target}> does not exist'}), 409
