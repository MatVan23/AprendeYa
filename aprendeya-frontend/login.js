const API = "http://localhost:8082/api/usuarios";

async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  errorDiv.textContent = "";

  try {

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      errorDiv.textContent = "Correo o contraseña incorrectos";
      return;
    }

    const usuario = await res.json();

    // Guardar usuario en localStorage
    localStorage.setItem("user", JSON.stringify(usuario));

    // Redirigir automáticamente según el rol
    if (usuario.rol === "PROFESOR") {
      window.location.href = "dashboard-profesor.html";
    } else if (usuario.rol === "ADMINISTRADOR") {
      window.location.href = "dashboard-admin.html";
    } else {
      window.location.href = "dashboard-estudiante.html";
    }

  } catch (error) {

    errorDiv.textContent = "Backend apagado o error de conexión";
    console.error(error);
  }
}