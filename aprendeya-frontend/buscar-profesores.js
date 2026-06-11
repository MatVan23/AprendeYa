const API = "https://aprendeya-backend.onrender.com/api";

async function buscarProfesores() {
    const materiaInput = document.getElementById("busqueda").value.toLowerCase();
    
    try {
        let clases = [];
        
        if (materiaInput.trim() === "") {
            // Si no hay búsqueda, mostrar todas las clases
            const res = await fetch(`${API}/clases`);
            clases = await res.json();
        } else {
            // Buscar por materia
            const res = await fetch(`${API}/clases/buscar/${materiaInput}`);
            clases = await res.json();
        }

        let tabla = document.getElementById("tablaProfesores");
        tabla.innerHTML = "";

        if (clases.length === 0) {
            tabla.innerHTML = "<tr><td colspan='5'>No hay clases disponibles</td></tr>";
            return;
        }

        clases.forEach(clase => {
            tabla.innerHTML += `
            <tr>
                <td>${clase.id}</td>
                <td>${clase.profesor.usuario.nombre}</td>
                <td>${clase.materia}</td>
                <td>${clase.descripcion}</td>
                <td>${clase.precio} Bs</td>
                <td>${new Date(clase.fechaHora).toLocaleString()}</td>
                <td>
                    <button onclick="seleccionarClase(${clase.id}, ${clase.profesor.id})">
                    Reservar
                    </button>
                </td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error al buscar clases");
    }
}

function seleccionarClase(claseId, profesorId) {
    // Guardar la clase seleccionada en localStorage
    localStorage.setItem("claseSeleccionada", JSON.stringify({
        claseId: claseId,
        profesorId: profesorId
    }));
    
    // Redirigir a reservas
    window.location.href = "reservas.html";
}

// Cargar clases al abrir la página
buscarProfesores();