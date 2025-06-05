from flask import Blueprint
from controllers.auth_controller import *

auth = Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login():
    return resolve_login()


@auth.route('/api/sign-up', methods=['POST'])
def sign_up():
    return resolve_sign_up()
