const API = "https://aprendeya-backend.onrender.com/api";

async function cargarUsuarios() {
  const res = await fetch(API);
  const usuarios = await res.json();
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";
  usuarios.forEach(u => {
    tabla.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.email}</td>
        <td>${u.rol}</td>
        <td>
          <button class="btn-edit" onclick="editarUsuario(${u.id})">Editar</button>
          <button class="btn-delete" onclick="eliminarUsuario(${u.id})">Eliminar</button>
        </td>
      </tr>`;
  });
}

async function guardarUsuario() {
  const id = document.getElementById("userId").value;
  const body = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    rol: document.getElementById("rol").value
  };

  if (id) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  }
  limpiarFormulario();
  cargarUsuarios();
}

async function editarUsuario(id) {
  const res = await fetch(`${API}/${id}`);
  const u = await res.json();
  document.getElementById("userId").value = u.id;
  document.getElementById("nombre").value = u.nombre;
  document.getElementById("email").value = u.email;
  document.getElementById("password").value = u.password;
  document.getElementById("rol").value = u.rol;
  document.getElementById("form-titulo").textContent = "Editar Usuario";
}

async function eliminarUsuario(id) {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarUsuarios();
  }
}

function limpiarFormulario() {
  document.getElementById("userId").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("rol").value = "ESTUDIANTE";
  document.getElementById("form-titulo").textContent = "Nuevo Usuario";
}

function cerrarSesion() {
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}

cargarUsuarios();