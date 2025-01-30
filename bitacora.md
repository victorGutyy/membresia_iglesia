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

### 📌 Bitácora - 30/01/2025  

#### **Actividad: Conexión y registro exitoso desde dispositivos móviles**  

**Descripción:**  
Se logró la conexión y el registro exitoso desde dispositivos móviles accediendo a la aplicación web.  

#### **Cambios realizados:**  
✅ Se configuró Flask para aceptar conexiones desde la red WiFi local.  
✅ Se ajustó el firewall de Windows para permitir tráfico en el puerto 5000.  
✅ Se corrigió la configuración de `CORS` en Flask para permitir peticiones externas.  
✅ Se verificó y corrigió la carga de archivos estáticos (`styles.css` y `script.js`).  
✅ Se realizaron pruebas desde un dispositivo móvil, validando que los datos se almacenan correctamente en la base de datos MySQL y se muestran en la tabla de la aplicación web.  

#### **Próximos pasos:**  
- Optimizar la interfaz para mejorar la experiencia en dispositivos móviles.  
- Implementar opciones de edición y eliminación de registros en la tabla.  
- Crear copias de seguridad automáticas de la base de datos.  

**Estado del proyecto:** ✔️ **Funcional y operativo en red local.**  

