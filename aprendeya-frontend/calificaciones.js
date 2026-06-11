const API = "https://aprendeya-backend.onrender.com/api";

async function cargarProfesoresParaCalificar() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener todas las clases aceptadas/completadas del estudiante
        const res = await fetch(`${API}/reservas/estudiante/${user.id}`);
        
        if (!res.ok) {
            alert("Error al cargar profesores");
            return;
        }

        const clases = await res.json();
        
        // Filtrar solo clases aceptadas
        const clasesAceptadas = clases.filter(c => c.estado === "ACEPTADA");
        
        const cont = document.getElementById("calificaciones");
        cont.innerHTML = "";

        if (clasesAceptadas.length === 0) {
            cont.innerHTML = "<p>No tienes clases completadas para calificar</p>";
            return;
        }

        clasesAceptadas.forEach(c => {
            cont.innerHTML += `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <p><strong>Profesor:</strong> ${c.clase.profesor.usuario.nombre}</p>
                <p><strong>Materia:</strong> ${c.clase.materia}</p>
                <p><strong>Descripción:</strong> ${c.clase.descripcion}</p>
                <p><strong>Fecha:</strong> ${new Date(c.clase.fechaHora).toLocaleString()}</p>
                <label for="nota-${c.id}">Puntuación (1-5):</label>
                <select id="nota-${c.id}">
                    <option value="">Selecciona una puntuación</option>
                    <option value="1">1 - Muy Malo</option>
                    <option value="2">2 - Malo</option>
                    <option value="3">3 - Regular</option>
                    <option value="4">4 - Bueno</option>
                    <option value="5">5 - Excelente</option>
                </select>
                <textarea id="comentario-${c.id}" placeholder="Comentario (opcional)" style="width: 100%; margin-top: 5px;"></textarea>
                <button onclick="calificar(${c.id}, ${c.clase.profesor.id})">Enviar Calificación</button>
            </div>`;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar profesores");
    }
}

async function calificar(reservaId, profesorId) {
    const nota = document.getElementById(`nota-${reservaId}`).value;
    const comentario = document.getElementById(`comentario-${reservaId}`).value;
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!nota) {
        alert("Debes seleccionar una puntuación");
        return;
    }

    try {
        const calificacion = {
    puntuacion: parseInt(nota),
    comentario: comentario,
    profesor: { id: profesorId },  // profesorId debe ser el ID de la tabla profesores
    estudiante: { id: user.id }    // este es el ID de usuarios
};

        const res = await fetch(`${API}/calificaciones`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(calificacion)
        });

        if (res.ok) {
            alert("Calificación enviada correctamente");
            cargarProfesoresParaCalificar();
        } else {
            alert("Error al enviar calificación");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar calificación");
    }
}

// Cargar profesores al abrir la página
cargarProfesoresParaCalificar();