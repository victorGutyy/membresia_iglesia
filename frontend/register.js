document.getElementById("registro-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!nombre || !correo || !password) {
        document.getElementById("mensaje").innerText = "Todos los campos son obligatorios.";
        return;
    }

    fetch("http://127.0.0.1:5000/registrar_usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        } else {
            document.getElementById("mensaje").innerText = data.error;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("mensaje").innerText = "Error en el servidor.";
    });
});
