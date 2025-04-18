from flask import Flask
from .routes import routes


def create_app():
    app = Flask(__name__)
    app.secret_key = 'secretKey'

    app.register_blueprint(routes)

    return app
    

