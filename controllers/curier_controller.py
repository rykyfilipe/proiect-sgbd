from flask_jwt_extended import create_access_token, get_jwt_identity
from flask import request, jsonify
from models import conn, cursor
import cx_Oracle

def get_free_orders(curier_name):
    cursor.execute("SELECT * FROM USERS WHERE NAME = :name", {'name': curier_name})
    user = cursor.fetchone()
    if not user:
        return jsonify({'message': 'Courier not found'}), 404

    curier_id = user[0]

    cursor.execute("SELECT * FROM CURIER_ORDER WHERE ID_CURIER IS NULL")
    orders = cursor.fetchall()

    data = []
    for row in orders:
        payload = {
            'name': row[0],
            'phone_number': row[1],
            'id': row[2],
            'id_from': row[3],
            'id_to': row[4],
            'distance': row[5],
            'status': row[6],
            'id_curier': row[7]
        }
        data.append(payload)

    return jsonify(data), 200


def get_curier_own_orders(curier_name):
    try:
        conn = cx_Oracle.connect(user='ryky', password='rykyfilipe', dsn='192.168.1.86:1521/xe')
        cursor = conn.cursor()

        cursor.execute("SELECT ID FROM USERS WHERE NAME = :name", {'name': curier_name})
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'Curier not found'}), 404

        curier_id = user[0]
        cursor.execute("SELECT * FROM ORDERS WHERE ID_CURIER = :id", {'id': curier_id})

        orders = []
        for row in cursor:
            orders.append({
                'id': row[0],
                'id_client': row[1],
                'id_from': row[2],
                'id_to': row[3],
                'status': row[4],
                'created_at': row[5],
                'distance': row[6],
                'expected_date': row[7],
                'id_curier': row[8]
            })

        cursor.close()
        conn.close()
        return jsonify(orders), 200

    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': str(e)}), 500


def update_order_status(curier_name):
    data = request.json
    order_id = data.get('order_id')
    new_status = data.get('status')

    if not order_id or not new_status:
        return jsonify({'message': 'Missing order_id or status'}), 400

    cursor.execute("SELECT * FROM CLIENT_ORDER WHERE ID = :id", {'id': order_id})
    order = cursor.fetchone()
    if not order:
        return jsonify({'message': 'Order not found'}), 404

    cursor.execute("""
        UPDATE CLIENT_ORDER
        SET STATUS = :status
        WHERE ID = :id
    """, {'status': new_status, 'id': order_id})

    conn.commit()

    return jsonify({'message': f'Status updated to "{new_status}" for order {order_id}'}), 200

def select_order(user_name):
    curier_name = get_jwt_identity()

    cursor.execute('SELECT ID FROM USERS WHERE NAME = :name', {'name': curier_name})
    curier = cursor.fetchone()

    if not curier:
        return jsonify({'message': 'Curier not found'}), 404

    curier_id = curier[0]

    data = request.json
    order_id = data.get('order_id')

    if not order_id:
        return jsonify({'message': 'Order ID is required'}), 400

    cursor.execute('SELECT ID, ID_CURIER FROM ORDERS WHERE ID = :id', {'id': order_id})
    order = cursor.fetchone()

    if not order:
        return jsonify({'message': 'Order not found'}), 404

    if order[1] is not None:
        return jsonify({'message': 'Order already taken'}), 400

    # Actualizează comanda cu ID-ul curierului
    cursor.execute('''
        UPDATE ORDERS
        SET ID_CURIER = :curier_id
        WHERE ID = :order_id
    ''', {'curier_id': curier_id, 'order_id': order_id})
    conn.commit()

    return jsonify({'message': 'Order assigned successfully'}), 200