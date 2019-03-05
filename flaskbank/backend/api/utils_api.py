from .. import all_module as am
utils_bp = am.Blueprint('Utilities API', __name__)


@utils_bp.route('/utils/!CLEAR-CLIENTS', methods=['DELETE'])
def clear_db():
    am.clients.delete_many({})
    return am.make_response('ALL CLIENTS DELETED', 200)
