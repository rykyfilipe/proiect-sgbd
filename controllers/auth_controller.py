from flask_jwt_extended import create_access_token
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import conn, cursor
from controllers.auth_controller import *
from models import conn, cursor
import cx_Oracle

def resolve_login():
    data = request.json

    name = data.get('name')
    password = data.get('password')
    role = data.get('role')

    if not name or not password:
        return jsonify({'message': 'All data must be given'}), 400

    cursor.execute('SELECT * FROM USERS WHERE NAME=:name', {'name': name})
    user = cursor.fetchone()

    if not user:
        return jsonify({'message': 'User does not exist'}), 404

    stored_hashed_password = user[2]  # sau user[3] – depinde de ordinea coloanelor în tabel

    if not check_password_hash(stored_hashed_password, password):
        return jsonify({"message": "Username or password incorrect"}), 400

    if role != user[4]:
        return jsonify({'message': 'U dont have that role'}), 400

    role = user[4]  # presupunem că aici este stocat rolul

    access_token = create_access_token(
        identity=name,
        additional_claims={"role": role}
    )

    cursor.execute('SELECT ID FROM USERS WHERE NAME = :user_name', {'user_name': name})
    user = cursor.fetchone()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_id = user[0]

    return jsonify({'access_token': access_token,
                    'id': user_id}), 200


def resolve_sign_up():
    data = request.json

    name = data.get('name')
    password = data.get('password')
    phone_number = data.get('phone_number')
    role = data.get('role')

    if not name or not password or not phone_number or not role:
        return jsonify({'message': 'All data must be given'}), 400

    if role not in ['user', 'delivery']:
        return jsonify({'message': 'Invalid role'}), 400

    password = generate_password_hash(password, method='scrypt', salt_length=16)
    try:
        result = cursor.callfunc("insert_user", cx_Oracle.STRING, [name, password, phone_number, role])
        conn.commit()

        access_token = create_access_token(
            identity=name,
            additional_claims={"role": role}
        )

        cursor.execute('SELECT ID FROM USERS WHERE NAME = :user_name', {'user_name': name})
        user = cursor.fetchone()

        if not user:
            return jsonify({'message': 'User not found'}), 404

        user_id = user[0]

        return jsonify({
            "message": result,
            "access_token": access_token,
            "id": user_id
        }), 200


    except cx_Oracle.DatabaseError as e:
        error_obj, = e.args  # Despachetăm eroarea Oracle
        error_msg = error_obj.message

        # Verificăm dacă e o eroare generată din RAISE_APPLICATION_ERROR (coduri între -20999 și -20000)
        if "ORA-20000" in error_msg or "ORA-" in error_msg:
            return jsonify({"error": error_msg}), 400  # sau 409 pentru "Conflict"

        # Eroare neașteptată
        return jsonify({"error": "Internal server error."}), 500



