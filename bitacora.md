# Bitácora de Desarrollo - Proyecto de Membresía Iglesia REFAM IPUC

## **📌 1. Configuración Inicial**
- Se creó el repositorio en GitHub.
- Se estableció la estructura del proyecto en `backend/` y `frontend/`.
- Se configuró **MySQL Workbench** y se creó la base de datos `iglesia` con la tabla `membresia`.

## **📌 2. Desarrollo del Backend (Flask + MySQL)**
- Se configuró **Flask** y **Flask-CORS** para permitir peticiones desde el frontend.
- Se estableció la conexión con MySQL.
- Se implementaron las rutas:
  - `POST /registrar`: Registra un nuevo miembro en la base de datos.
  - `GET /miembros`: Obtiene todos los miembros registrados.
- Se realizaron pruebas con **cURL** y desde **MySQL Workbench** para validar el almacenamiento.

## **📌 3. Desarrollo del Frontend (HTML + CSS + JavaScript)**
- Se diseñó un formulario de registro con validaciones en **JavaScript**.
- Se creó una tabla dinámica para mostrar los registros desde MySQL.
- Se implementó `fetch` en **JavaScript** para conectar con el backend.

## **📌 4. Configuración de Acceso en Red Local**
- Se configuró **Flask para aceptar conexiones externas** (`host='0.0.0.0'`).
- Se obtuvo la IP del servidor (`192.168.91.226`) para acceso desde otros dispositivos.
- Se ajustaron las peticiones en `script.js` para usar la IP del servidor.
- Se habilitó el **puerto 5000 en el Firewall de Windows** para permitir conexiones.

## **📌 5. Pruebas Finales y Subida a GitHub**
- Se validó el acceso desde múltiples dispositivos en la red WiFi.
- Se corrigieron errores en `server.py` y `script.js`.
- Se realizó la prueba de conexión con `cURL` para verificar el correcto funcionamiento.
- **Subiremos el código actualizado al repositorio de GitHub.**

---

## **📌 Próximos Pasos**
✅ **Optimizar la interfaz del frontend.**
✅ **Implementar funciones para editar y eliminar registros.**
✅ **Mejorar la seguridad de la API (validaciones adicionales).**
✅ **Desplegar la aplicación en un servidor permanente.**

🚀 **Listo para subir los cambios a GitHub!** 😃
