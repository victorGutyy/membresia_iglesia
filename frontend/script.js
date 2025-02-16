document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membresia-form");
    const tablaMiembros = document.getElementById("tabla-miembros");

    let idEditando = null; // Almacena el ID del registro en edición
    const API_URL = "http://127.0.0.1:5000"; // Cambia esto si la IP cambia en la red

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let nombre = document.getElementById("nombre_completo").value.trim();
        let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
        let direccion = document.getElementById("direccion").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let correo = document.getElementById("correo_electronico").value.trim();
        let tiempoBautizado = document.getElementById("tiempo_bautizado").value.trim();
        let promesado = document.getElementById("promesado").value;
        let experienciaRefam = document.getElementById("experiencia_refam").value.trim();
        let dondeEstasDandoRefam = document.getElementById("donde_estas_dando_refam").value.trim();
        let nivelYClase = document.getElementById("nivel_y_clase").value.trim();

        // Validación de Campos
        if (!nombre || !fechaNacimiento || !direccion || !telefono || !correo || !tiempoBautizado || !experienciaRefam  || !dondeEstasDandoRefam || !nivelYClase) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!/^\d{10}$/.test(telefono)) {
            alert("El número de teléfono debe tener 10 dígitos.");
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
            experiencia_refam: experienciaRefam,
            donde_estas_dando_refam: dondeEstasDandoRefam,
            nivel_y_clase: nivelYClase
        };

        const url = idEditando ? `${API_URL}/editar/${idEditando}` : `${API_URL}/registrar`;
        const method = idEditando ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || "Operación exitosa");
            form.reset();
            idEditando = null;
            cargarMiembros();
        })
        .catch(error => alert("Error al conectar con el servidor: " + error));
    });

    function cargarMiembros() {
        fetch(`${API_URL}/miembros`)
        .then(response => response.json())
        .then(data => {
            tablaMiembros.innerHTML = "";
            data.forEach(miembro => {
                let row = `
                    <tr>
                        <td>${miembro.id}</td>
                        <td>${miembro.nombre_completo}</td>
                        <td>${miembro.fecha_nacimiento}</td>
                        <td>${miembro.direccion}</td>
                        <td>${miembro.telefono}</td>
                        <td>${miembro.correo_electronico}</td>
                        <td>${miembro.tiempo_bautizado}</td>
                        <td>${miembro.promesado ? "Sí" : "No"}</td>
                        <td>${miembro.experiencia_refam}</td>
                        <td>${miembro.donde_estas_dando_refam}</td>
                        <td>${miembro.nivel_y_clase}</td>
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
                document.getElementById("donde_estas_dando_refam").value = miembro.donde_estas_dando_refam;
                document.getElementById("nivel_y_clase").value = miembro.nivel_y_clase;
                
                idEditando = id;
                alert("Editando registro ID: " + id);
            }
        })
        .catch(error => console.error("Error al obtener datos para edición:", error));
    };

    cargarMiembros();
});
