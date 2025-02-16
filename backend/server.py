from flask import Flask, request, jsonify, send_from_directory, session
import mysql.connector
from mysql.connector import Error
import sys
from flask_cors import CORS

# Asegurar que todo maneje UTF-8
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__, static_folder='../frontend')
CORS(app)  # Habilitar CORS para permitir peticiones desde el frontend
app.secret_key = 'mi_secreto_seguro'  # Clave secreta para manejar sesiones

# Usuario y contraseña únicos
USUARIO_UNICO = "refamipuc4calarca@gmail.com"
PASSWORD_UNICO = "refam2025"

# Configuración de la conexión a MySQL
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '042485',
    'database': 'iglesia',
    'charset': 'utf8mb4'
}

# Servir archivos estáticos correctamente
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Ruta para servir la página de inicio de sesión
@app.route('/')
def index():
    if 'usuario' not in session:
        return send_from_directory(app.static_folder, 'login.html')
    return send_from_directory(app.static_folder, 'index.html')

# Ruta para inicio de sesión con usuario único
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        correo = data.get('correo')
        password = data.get('password')

        if correo == USUARIO_UNICO and password == PASSWORD_UNICO:
            session['usuario'] = correo
            return jsonify({"mensaje": "Inicio de sesión exitoso"}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para cerrar sesión
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('usuario', None)
    return jsonify({"mensaje": "Sesión cerrada"}), 200

# Middleware para proteger rutas
def login_requerido(f):
    def wrap(*args, **kwargs):
        if 'usuario' not in session:
            return jsonify({"error": "Acceso no autorizado"}), 403
        return f(*args, **kwargs)
    wrap.__name__ = f.__name__
    return wrap

# Ruta para recibir datos del formulario y guardarlos en MySQL (restringido)
@app.route('/registrar', methods=['POST'])
@login_requerido
def registrar_membresia():
    try:
        data = request.get_json()
        required_fields = ['nombre_completo', 'fecha_nacimiento', 'direccion', 'telefono', 'correo_electronico', 'tiempo_bautizado', 'promesado', 'experiencia_refam']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Faltan datos en la solicitud"}), 400

        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor()
        
        query = """
        INSERT INTO membresia (nombre_completo, fecha_nacimiento, direccion, telefono, correo_electronico, tiempo_bautizado, promesado, experiencia_refam)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        valores = (
            data['nombre_completo'],
            data['fecha_nacimiento'],
            data['direccion'],
            data['telefono'],
            data['correo_electronico'],
            data['tiempo_bautizado'],
            bool(data['promesado']),
            data['experiencia_refam'],
            data['donde_estas_dando_refam'],
            data['nivel_y_clase']
            
        )

        cursor.execute(query, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"mensaje": "Registro exitoso"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500

# Ruta para obtener la lista de miembros (restringido)
@app.route('/miembros', methods=['GET'])
@login_requerido
def obtener_miembros():
    try:
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM membresia")
        miembros = cursor.fetchall()
        cursor.close()
        conexion.close()
        return jsonify(miembros), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar un registro existente (restringido)
@app.route('/editar/<int:id>', methods=['PUT'])
@login_requerido
def editar_membresia(id):
    try:
        data = request.get_json()
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor()
        
        query = """
        UPDATE membresia 
        SET nombre_completo = %s, fecha_nacimiento = %s, direccion = %s, telefono = %s, 
            correo_electronico = %s, tiempo_bautizado = %s, promesado = %s, experiencia_refam = %s, donde_estas_dando_refam = %s, nivel_y_clase = %s
        WHERE id = %s
        """
        valores = (
            data['nombre_completo'],
            data['fecha_nacimiento'],
            data['direccion'],
            data['telefono'],
            data['correo_electronico'],
            data['tiempo_bautizado'],
            bool(data['promesado']),
            data['experiencia_refam'],
            data['donde_estas_dando_refam'],
            data['nivel_y_clase'],
            id
        )

        cursor.execute(query, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"mensaje": "Registro actualizado correctamente"}), 200

    except Error as e:
        return jsonify({"error": str(e)}), 500

# Ruta para eliminar un registro (restringido)
@app.route('/eliminar/<int:id>', methods=['DELETE'])
@login_requerido
def eliminar_membresia(id):
    try:
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor()
        
        query = "DELETE FROM membresia WHERE id = %s"
        cursor.execute(query, (id,))
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"mensaje": "Registro eliminado correctamente"}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
