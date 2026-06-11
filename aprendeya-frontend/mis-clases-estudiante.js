const API = "https://aprendeya-backend.onrender.com/api";

async function cargarClases() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener todas las reservas del estudiante
        const res = await fetch(`${API}/reservas/estudiante/${user.id}`);
        
        if (!res.ok) {
            alert("Error al cargar mis clases");
            return;
        }

        const clases = await res.json();
        
        // Ordenar por fecha
        clases.sort((a, b) => new Date(a.clase.fechaHora) - new Date(b.clase.fechaHora));
        
        const tbody = document.getElementById("tabla");
        tbody.innerHTML = "";

        if (clases.length === 0) {
            tbody.innerHTML = "<tr><td colspan='8'>No tienes clases reservadas</td></tr>";
            return;
        }

        clases.forEach(c => {
            const fecha = new Date(c.clase.fechaHora);
            const fechaFormato = fecha.toLocaleDateString();
            const horaFormato = fecha.toLocaleTimeString();
            
            let estadoClase = c.estado;
            let enlaceAccion = "-";
            
            if (c.estado === "ACEPTADA" && c.linkClase) {
                enlaceAccion = `<a href="${c.linkClase}" target="_blank">Entrar a Clase</a>`;
            }
            
            tbody.innerHTML += `
            <tr>
                <td>${c.clase.materia}</td>
                <td>${c.clase.profesor.usuario.nombre}</td>
                <td>${c.clase.descripcion}</td>
                <td>${c.clase.precio} Bs</td>
                <td>${fechaFormato}</td>
                <td>${horaFormato}</td>
                <td>${estadoClase}</td>
                <td>${enlaceAccion}</td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar clases");
    }
}

// Cargar clases al abrir la página
cargarClases();