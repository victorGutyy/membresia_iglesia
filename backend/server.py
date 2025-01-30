from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
import json
import sys
from flask_cors import CORS

# Asegurar que todo maneje UTF-8
sys.stdout.reconfigure(encoding='utf-8')

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir peticiones desde el frontend

# Configuración de la conexión a MySQL
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '042485',
    'database': 'iglesia'
}

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

# Ruta para obtener la lista de miembros
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
