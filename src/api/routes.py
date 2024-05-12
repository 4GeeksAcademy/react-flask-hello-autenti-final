from flask import Blueprint, request, jsonify, session, redirect, url_for
from api.models import db, User
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    # Obtiene los datos del cuerpo de la solicitud
    data = request.json
    email = data['email']
    password = data['password']

    # Verifica si el usuario ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'El correo ya está en uso'}), 400

    # Crea un nuevo usuario
    new_user = User(email=email, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

# Define la función de inicio de sesión (login)
@api.route('/login', methods=['POST'])
def login():
    # Obtiene los datos del cuerpo de la solicitud
    data = request.json
    email = data['email']
    password = data['password']

    # Busca al usuario en la base de datos
    user = User.query.filter_by(email=email).first()

    # Verifica si el usuario existe y si la contraseña es correcta
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Inicio de sesión exitoso'}), 200
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401

# Define la función de cierre de sesión (logout)
@api.route('/logout')
def logout():
    # Elimina la sesión del usuario
    session.pop('user_id', None)
    return redirect(url_for('login'))

# Define la función para la página privada (private)
@api.route('/private')
def private():
    # Verifica si el usuario tiene una sesión activa
    if 'user_id' not in session:
        return redirect(url_for('login'))
    else:
        return jsonify({'message': 'Bienvenido a la página privada'})
