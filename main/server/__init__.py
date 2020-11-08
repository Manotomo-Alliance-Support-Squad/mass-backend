import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_caching import Cache

from main.server.models import db
from main.server.models import ma

app = Flask(__name__, static_url_path='')
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
app_config = os.getenv("APP_CONFIG", "main.server.config.ProductionConfig")
app.config.from_object(app_config)

cache.init_app(app)
db.init_app(app)
ma.init_app(app)
bcrypt = Bcrypt(app)

# These need to be imported here probably due to some serial
# runtime issue.
from main.server import jwt  # noqa noreorder
from main.server.api import api_bp  # noqa noreorder

# Registering of the pai endpoint at "www.domain.xyz/api"
app.register_blueprint(api_bp, url_prefix="/api")
