document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membresia-form");
    const tablaMiembros = document.getElementById("tabla-miembros");

    let idEditando = null; // Almacena el ID del registro en edición
    const API_URL = "http://192.168.1.11:5000"; // Cambia esto si la IP cambia en la red

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        let nombre = document.getElementById("nombre_completo").value.trim();
        let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
        let direccion = document.getElementById("direccion").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let correo = document.getElementById("correo_electronico").value.trim();
        let tiempoBautizado = document.getElementById("tiempo_bautizado").value.trim();
        let promesado = document.getElementById("promesado").value;
        let experienciaRefam = document.getElementById("experiencia_refam").value.trim();

        if (!nombre || !fechaNacimiento || !direccion || !telefono || !correo || !tiempoBautizado) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!/^[\d\+\-\s]+$/.test(telefono)) {
            alert("El número de teléfono no es válido.");
            return;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
            alert("El correo electrónico no es válido.");
            return;
        }

        let formData = {
            nombre_completo: nombre,
            fecha_nacimiento: fechaNacimiento,
            direccion: direccion,
            telefono: telefono,
            correo_electronico: correo,
            tiempo_bautizado: tiempoBautizado,
            promesado: promesado,
            experiencia_refam: experienciaRefam
        };

        if (idEditando) {
            // Si hay un ID, actualizamos el registro
            fetch(`${API_URL}/editar/${idEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || "Registro actualizado exitosamente");
                form.reset();
                idEditando = null; // Reiniciar el modo edición
                cargarMiembros();
            })
            .catch(error => alert("Error al actualizar el registro: " + error));
        } else {
            // Si no hay un ID, es un nuevo registro
            fetch(`${API_URL}/registrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || "Registro exitoso");
                form.reset();
                cargarMiembros();
            })
            .catch(error => alert("Error al enviar el formulario: " + error));
        }
    });

    function cargarMiembros() {
        fetch(`${API_URL}/miembros`)
        .then(response => response.json())
        .then(data => {
            tablaMiembros.innerHTML = "";
            data.forEach(miembro => {
                let row = `<tr>
                    <td>${miembro.id}</td>
                    <td>${miembro.nombre_completo}</td>
                    <td>${miembro.fecha_nacimiento}</td>
                    <td>${miembro.direccion}</td>
                    <td>${miembro.telefono}</td>
                    <td>${miembro.correo_electronico}</td>
                    <td>${miembro.tiempo_bautizado}</td>
                    <td>${miembro.promesado ? "Sí" : "No"}</td>
                    <td>${miembro.experiencia_refam}</td>
                    <td>
                        <button onclick="editarMiembro(${miembro.id})">✏️ Editar</button>
                        <button onclick="eliminarMiembro(${miembro.id})">🗑️ Eliminar</button>
                    </td>
                </tr>`;
                tablaMiembros.innerHTML += row;
            });
        })
        .catch(error => console.error("Error al cargar miembros:", error));
    }

    // Función para eliminar un miembro
    window.eliminarMiembro = function (id) {
        if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
            fetch(`${API_URL}/eliminar/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || "Registro eliminado correctamente");
                cargarMiembros();
            })
            .catch(error => alert("Error al eliminar el registro: " + error));
        }
    };

    // Función para cargar datos en el formulario y editar
    window.editarMiembro = function (id) {
        fetch(`${API_URL}/miembros`)
        .then(response => response.json())
        .then(data => {
            let miembro = data.find(m => m.id === id);
            if (miembro) {
                document.getElementById("nombre_completo").value = miembro.nombre_completo;
                document.getElementById("fecha_nacimiento").value = miembro.fecha_nacimiento;
                document.getElementById("direccion").value = miembro.direccion;
                document.getElementById("telefono").value = miembro.telefono;
                document.getElementById("correo_electronico").value = miembro.correo_electronico;
                document.getElementById("tiempo_bautizado").value = miembro.tiempo_bautizado;
                document.getElementById("promesado").value = miembro.promesado ? "true" : "false";
                document.getElementById("experiencia_refam").value = miembro.experiencia_refam;
                
                idEditando = id; // Guardar el ID del registro en edición
                alert("Editando registro ID: " + id);
            }
        })
        .catch(error => console.error("Error al obtener datos para edición:", error));
    };

    cargarMiembros(); // Cargar la lista al iniciar la página
});
