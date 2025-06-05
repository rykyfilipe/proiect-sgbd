from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from controllers.curier_controller import *

curier = Blueprint('curier', __name__)


@curier.route('/api/curier-orders', methods = ['GET'])
@jwt_required()
def get_curier_orders():
    curier_name = get_jwt_identity()
    return get_free_orders(curier_name)

@curier.route('/api/curier-own-orders', methods = ['GET'])
@jwt_required()
def get_curier_orders_by_name():
    curier_name = get_jwt_identity()
    return get_curier_own_orders(curier_name)

@curier.route('/api/curier-orders-stauts', methods = ['PATCH'])
@jwt_required()
def update_status():
    curier_name = get_jwt_identity()
    return update_order_status(curier_name)

@curier.route('/api/curier-set-order', methods = ['POST'])
@jwt_required()
def claim_order():
    curier_name = get_jwt_identity()
    return select_order(curier_name)
