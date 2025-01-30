document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membresia-form");
    const tablaMiembros = document.getElementById("tabla-miembros");

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

        fetch("http://192.168.91.226:5000/registrar", {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || "Registro exitoso");
            form.reset();
            cargarMiembros(); // Recargar la lista de miembros después del registro
        })
        .catch(error => {
            alert("Error al enviar el formulario: " + error);
        });
    });

    function cargarMiembros() {
        fetch("http://192.168.91.226:5000/miembros")
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
                </tr>`;
                tablaMiembros.innerHTML += row;
            });
        })
        .catch(error => console.error("Error al cargar miembros:", error));
    }

    cargarMiembros(); // Cargar la lista al iniciar la página
});

