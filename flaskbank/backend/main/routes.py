"""
Serve react app
"""
from pathlib import Path
from .. import all_module as am
main_bp = am.Blueprint('main', __name__)


# Catch all
@main_bp.route('/', defaults={'path': ''})
@main_bp.route('/<path:path>')
def catch_all(path):
    file_path = './flaskbank/react-app/build'
    if path and Path(file_path+'/'+path).exists():
        print('sent: ', path)
        return am.send_from_directory(am.Config.TEMPLATE_PATH, path)
    print(f'Caught /{path}')
    return am.render_template('index.html')
