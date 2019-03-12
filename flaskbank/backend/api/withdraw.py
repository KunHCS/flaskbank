from .. import all_module as am
withdraw_bp = am.Blueprint('withdraw', __name__)


@withdraw_bp.route('/withdraw', methods=['POST'])
def withdraw():
    pass

