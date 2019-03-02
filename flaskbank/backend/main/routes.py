"""
Main routes, home page ++ test
"""
from pathlib import Path
from .. import all_module as am
main_bp = am.Blueprint('main', __name__)


# Catch all
@main_bp.route('/', defaults={'path': ''})
@main_bp.route('/<path:path>')
def catch_all(path):
    if path and Path.exists(Path(str(am.Config.TEMPLATE_PATH) + path)):
        return am.send_from_directory(am.Config.TEMPLATE_PATH, path)
    return am.render_template('index.html')
