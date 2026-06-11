const API = "http://localhost:8082/api";
let profesorId = null;

async function cargarPerfilProfesor() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch(`${API}/profesores/usuario/${user.id}`);
        
        if (res.ok) {
            const profesor = await res.json();
            profesorId = profesor.id;
            document.getElementById("materia").value = profesor.materias || "";
            document.getElementById("experiencia").value = profesor.experiencia || "";
            document.getElementById("disponibilidad").value = profesor.disponibilidad || "";
            document.getElementById("descripcion").value = profesor.descripcion || "";
        } else {
            // No tiene perfil aún, lo creamos automáticamente
            const nuevoProfesor = await fetch(`${API}/profesores`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuario: { id: user.id },
                    materias: "",
                    experiencia: "",
                    disponibilidad: "",
                    descripcion: ""
                })
            });

            if (nuevoProfesor.ok) {
                const profesor = await nuevoProfesor.json();
                profesorId = profesor.id;
            } else {
                alert("Error al inicializar perfil de profesor");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
    }
}

async function guardarPerfil() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    const materia = document.getElementById("materia").value;
    const experiencia = document.getElementById("experiencia").value;
    const disponibilidad = document.getElementById("disponibilidad").value;
    const descripcion = document.getElementById("descripcion").value;

    if (!materia || !experiencia || !disponibilidad) {
        alert("Por favor completa todos los campos");
        return;
    }

    try {
        // Si no tenemos el profesorId aún, lo buscamos
        if (!profesorId) {
            const res = await fetch(`${API}/profesores/usuario/${user.id}`);
            if (res.ok) {
                const p = await res.json();
                profesorId = p.id;
            } else {
                alert("Error al obtener perfil");
                return;
            }
        }

        const res = await fetch(`${API}/profesores/${profesorId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: profesorId,
                usuario: { id: user.id },
                materias: materia,
                experiencia: experiencia,
                disponibilidad: disponibilidad,
                descripcion: descripcion
            })
        });

        const mensajeDiv = document.getElementById("mensaje");
        if (res.ok) {
            mensajeDiv.style.display = "block";
            mensajeDiv.className = "success";
            mensajeDiv.textContent = "✓ Perfil guardado correctamente";
            setTimeout(() => { mensajeDiv.style.display = "none"; }, 3000);
        } else {
            mensajeDiv.style.display = "block";
            mensajeDiv.className = "error";
            mensajeDiv.textContent = "❌ Error al guardar perfil";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
    }
}

cargarPerfilProfesor();