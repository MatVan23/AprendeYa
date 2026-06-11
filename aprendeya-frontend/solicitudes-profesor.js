const API = "http://localhost:8082/api";

async function cargarSolicitudes() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener solo las solicitudes pendientes del profesor
        const res = await fetch(`${API}/reservas/profesor/${user.id}`);
        
        if (!res.ok) {
            alert("Error al cargar solicitudes");
            return;
        }

        const solicitudes = await res.json();
        
        const tbody = document.getElementById("tablaSolicitudes");
        tbody.innerHTML = "";

        if (solicitudes.length === 0) {
            tbody.innerHTML = "<tr><td colspan='6'>No hay solicitudes pendientes</td></tr>";
            return;
        }

        solicitudes.forEach(s => {
            tbody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.estudiante.nombre}</td>
                <td>${s.clase.materia}</td>
                <td>${new Date(s.clase.fechaHora).toLocaleString()}</td>
                <td>${s.estado}</td>
                <td>${s.linkClase || "-"}</td>
                <td>
                    ${s.estado === "PENDIENTE" ? `
                        <button onclick="aceptar(${s.id})">Aceptar</button>
                        <button onclick="rechazar(${s.id})">Rechazar</button>
                    ` : `-`}
                </td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar solicitudes");
    }
}

async function aceptar(id) {
    const link = prompt("Ingresa el link de Google Meet:");
    
    if (!link) {
        alert("Debes ingresa un link de Meet");
        return;
    }

    try {
        const res = await fetch(`${API}/reservas/${id}/aceptar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ linkClase: link })
        });

        if (res.ok) {
            alert("Clase aceptada correctamente");
            cargarSolicitudes();
        } else {
            alert("Error al aceptar la clase");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al aceptar la clase");
    }
}

async function rechazar(id) {
    if (!confirm("¿Estás seguro de que quieres rechazar esta clase?")) {
        return;
    }

    try {
        const res = await fetch(`${API}/reservas/${id}/rechazar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            alert("Clase rechazada correctamente");
            cargarSolicitudes();
        } else {
            alert("Error al rechazar la clase");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al rechazar la clase");
    }
}

// Cargar solicitudes al abrir la página
cargarSolicitudes();