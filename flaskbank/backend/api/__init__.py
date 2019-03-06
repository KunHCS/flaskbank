from .register import register_bp
# from .login import login
from .jwt_login import login_bp
from .get_client_info import get_client_bp
from .utils_api import utils_bp

API_BLUEPRINTS = (register_bp, login_bp, get_client_bp, utils_bp)