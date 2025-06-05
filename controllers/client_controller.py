from flask_jwt_extended import create_access_token
from flask import request, jsonify
from models import conn, cursor
import cx_Oracle

def get_all_clients():
    cursor.execute('SELECT * FROM USERS')
    for row in cursor:
        print(row)

    return 'Vey good', 200

def return_all_orders_by_name(user_name):
    # Căutăm ID-ul utilizatorului
    cursor.execute('SELECT ID FROM USERS WHERE NAME = :user_name', {'user_name': user_name})
    user = cursor.fetchone()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_id = user[0]

    # Căutăm comenzile în funcție de user_id
    cursor.execute('SELECT * FROM CLIENT_ORDER WHERE ID_CLIENT = :user_id', {'user_id': user_id})

    data = []
    for row in cursor:
        payload = {
            'id': row[0],
            'status': row[1],
            'distance': row[2],
            'curier_name': row[3],
            'phone_number': row[4]
        }
        data.append(payload)

    if not data:
        return jsonify({'message': 'User has no orders'}), 404

    return jsonify(data), 200

def create_order(user_name):
    data = request.json

    id_from = data.get('id_from')
    id_to = data.get('id_to')
    id_client = data.get('user_id')

    if not id_from or not id_to or not id_client:
        return jsonify({'message': 'Invalid data'}), 400

    try:
        result = cursor.callfunc("insert_order", cx_Oracle.STRING, [id_client, id_from , id_to])
        conn.commit()
        return jsonify({"message": result}), 200

    except cx_Oracle.DatabaseError as e:
        error_obj, = e.args
        error_msg = error_obj.message

        if "ORA-20000" in error_msg or "ORA-" in error_msg:
            return jsonify({"error": error_msg}), 400

        # Eroare neașteptată
        return jsonify({"error": "Internal server error."}), 500

    return jsonify({'message': result})
