const API = "https://aprendeya-backend.onrender.com/api";

async function registrar() {
  const body = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    rol: document.getElementById("rol").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert("Usuario registrado correctamente");
    window.location.href = "index.html";
  } else {
    document.getElementById("mensaje").textContent = "Error al registrar usuario";
  }
}