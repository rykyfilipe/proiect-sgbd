from flask import Flask
from views.auth_views import auth
from views.client_views import client
from views.curier_views import curier
from controllers import jwt
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    app.config['JWT_SECRET_KEY'] = 'super-secret-key'
    jwt.init_app(app)
    app.register_blueprint(auth)
    app.register_blueprint(client)
    app.register_blueprint(curier)

    CORS(app)
    return app