from .register import register_bp
from .auth import login_bp
from .get_client_info import get_client_bp
from .utils_api import utils_bp
from .deposit import deposit_bp
from .withdraw import withdraw_bp

API_BLUEPRINTS = (register_bp, login_bp, get_client_bp, utils_bp, deposit_bp, withdraw_bp)
