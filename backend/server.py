from flask import Flask, request, jsonify, send_from_directory
import mysql.connector
from mysql.connector import Error
import json
import sys
from flask_cors import CORS
import os  # Para manejar rutas de archivos

# Asegurar que todo maneje UTF-8
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__, static_folder='../frontend')
CORS(app)  # Habilitar CORS para permitir peticiones desde el frontend

# Servir archivos estáticos correctamente
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Configuración de la conexión a MySQL
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '042485',
    'database': 'iglesia',
    'charset': 'utf8mb4'  # Asegurar codificación UTF-8
}

# Ruta para servir la página principal
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Ruta para recibir datos del formulario y guardarlos en MySQL
@app.route('/registrar', methods=['POST'])
def registrar_membresia():
    try:
        data = request.get_json()  # Obtener JSON directamente
        print("Datos recibidos:", data)

        # Verificar si los datos están completos
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
            bool(data['promesado']),  # Convertir a booleano si es necesario
            data['experiencia_refam']
        )

        cursor.execute(query, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        print("Registro insertado en MySQL")
        return jsonify({"mensaje": "Registro exitoso"}), 201
    
    except Error as e:
        print("Error en MySQL:", str(e))
        return jsonify({"error": str(e)}), 500

# Ruta para obtener la lista de miembros con codificación UTF-8
@app.route('/miembros', methods=['GET'])
def obtener_miembros():
    try:
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM membresia")
        miembros = cursor.fetchall()
        cursor.close()
        conexion.close()
        print("Datos enviados al frontend:", miembros)
        return jsonify(miembros), 200
    except Error as e:
        print("Error al obtener miembros:", str(e))
        return jsonify({"error": str(e)}), 500

# Ruta para actualizar un registro existente
@app.route('/editar/<int:id>', methods=['PUT'])
def editar_membresia(id):
    try:
        data = request.get_json()
        conexion = mysql.connector.connect(**DB_CONFIG)
        cursor = conexion.cursor()
        
        query = """
        UPDATE membresia 
        SET nombre_completo = %s, fecha_nacimiento = %s, direccion = %s, telefono = %s, 
            correo_electronico = %s, tiempo_bautizado = %s, promesado = %s, experiencia_refam = %s
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
            id
        )

        cursor.execute(query, valores)
        conexion.commit()
        cursor.close()
        conexion.close()

        return jsonify({"mensaje": "Registro actualizado correctamente"}), 200

    except Error as e:
        return jsonify({"error": str(e)}), 500

# Ruta para eliminar un registro
@app.route('/eliminar/<int:id>', methods=['DELETE'])
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
