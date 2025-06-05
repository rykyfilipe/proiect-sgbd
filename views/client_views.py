from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from controllers.client_controller import *


client = Blueprint('client', __name__)

@client.route('/api/clients')
@jwt_required()
def list_all_clients():
    return get_all_clients()

@client.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    jwt_data = get_jwt()
    role = jwt_data["role"]
    print(get_jwt_identity())
    return jsonify({"message":role})

@client.route('/api/orders', methods = ['GET'])
@jwt_required()
def get_orders_by_name():
    user_name = get_jwt_identity()
    return return_all_orders_by_name(user_name)

@client.route('/api/orders', methods = ['POST'])
@jwt_required()
def add_order():
    user_name = get_jwt_identity()
    return create_order(user_name)