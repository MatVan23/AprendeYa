const API = "http://localhost:8082/api";

async function cargarClases() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener todas las clases reservadas del profesor
        const res = await fetch(`${API}/reservas/profesor/${user.id}/todas`);
        
        if (!res.ok) {
            alert("Error al cargar clases");
            return;
        }

        const clases = await res.json();
        
        // Ordenar por fecha
        clases.sort((a, b) => new Date(a.clase.fechaHora) - new Date(b.clase.fechaHora));
        
        const tbody = document.getElementById("tabla");
        tbody.innerHTML = "";

        if (clases.length === 0) {
            tbody.innerHTML = "<tr><td colspan='7'>No tienes clases reservadas</td></tr>";
            return;
        }

        clases.forEach(c => {
            const fecha = new Date(c.clase.fechaHora);
            const fechaFormato = fecha.toLocaleDateString();
            const horaFormato = fecha.toLocaleTimeString();
            
            tbody.innerHTML += `
            <tr>
                <td>${c.estudiante.nombre}</td>
                <td>${c.clase.materia}</td>
                <td>${c.clase.descripcion}</td>
                <td>${c.clase.precio} Bs</td>
                <td>${fechaFormato}</td>
                <td>${horaFormato}</td>
                <td>${c.estado}</td>
                <td>
                    ${c.linkClase ? `<a href="${c.linkClase}" target="_blank">Link Meet</a>` : "-"}
                </td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar clases");
    }
}

// Cargar clases al abrir la página
cargarClases();