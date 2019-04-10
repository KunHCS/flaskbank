from flaskbank.backend import create_app
from flaskbank.backend.config import ProductionConfig
app = create_app(ProductionConfig)
