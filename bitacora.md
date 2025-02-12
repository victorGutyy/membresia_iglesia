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

📅 Fecha: 31 de enero de 2025
🛠️ Actividades realizadas:

1️⃣ Corrección y mejora del formulario de registro de miembros

Se solucionaron problemas de conexión en la red WiFi.
Se ajustaron los estilos CSS para una mejor visualización en dispositivos móviles y pantallas grandes.
2️⃣ Implementación de acciones en la tabla de miembros

Se agregó la opción de "Editar" registros.
Se agregó la opción de "Eliminar" registros.
Se ajustó la carga de datos para que la tabla refleje los cambios en tiempo real.
3️⃣ Corrección de errores en la codificación UTF-8

Se aseguraron los caracteres especiales en MySQL y en la visualización en el frontend.
4️⃣ Pruebas exitosas en diferentes dispositivos y navegadores

Se verificó el acceso desde computadoras y celulares conectados a la misma red.
Se validó que los registros se almacenan correctamente en la base de datos y se muestran en la tabla.
5️⃣ Subida de cambios al repositorio GitHub

Se actualizaron los archivos del frontend (index.html, styles.css, script.js).
Se actualizaron los archivos del backend (server.py).
Se subieron las mejoras al repositorio de GitHub.

📅 Bitácora - [Fecha de Hoy]
📌 Proyecto: Membresía Iglesia
👨‍💻 Desarrollador: [Tu Nombre]

✅ Tareas Realizadas
Implementación de página de inicio de sesión (Login)

Se creó el archivo login.html con un formulario de autenticación.
Se agregó validación y conexión con el backend a través de login.js.
Se integró el inicio de sesión en server.py, con validación de credenciales en la base de datos.
Creación de página de registro de usuarios

Se creó register.html para permitir la creación de nuevos usuarios.
Se implementó register.js para gestionar la petición de registro en el backend.
Se actualizó server.py para manejar el registro de usuarios en MySQL.
Corrección de errores en la base de datos

Se corrigió el nombre de la columna contraseña en la tabla usuarios a password para evitar errores en las consultas.
Se verificó la estructura de la base de datos en MySQL Workbench.
Seguridad y restricción de acceso

Se implementó manejo de sesiones en Flask para restringir el acceso a la página de membresía.
Se protegieron las rutas en server.py con validación de sesión.
Se agregó la funcionalidad de cerrar sesión (logout).
Corrección de conexión entre el frontend y backend

Se ajustó script.js para usar la IP correcta del servidor (127.0.0.1:5000).
Se verificó la ejecución del servidor Flask y la conectividad con MySQL.
Pruebas y despliegue en el entorno local

Se realizaron pruebas de login, registro de usuarios y redirección.
Se probó el registro de membresía y consulta de datos en la base de datos.
Se resolvió un error de conexión con fetch() al registrar miembros.
Subida del proyecto a GitHub

Se añadieron y confirmaron los cambios (git add . y git commit -m "Actualización").
Se subió el código al repositorio con git push origin main.
🚀 Próximos Pasos
🔹 Optimizar la UI/UX de las páginas de login y registro.
🔹 Implementar recuperación de contraseña.
🔹 Considerar la compra de un dominio y hosting para desplegar el proyecto.
🔹 Configurar despliegue en un servidor externo (Heroku, DigitalOcean o similar).