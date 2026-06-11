const API = "https://aprendeya-backend.onrender.com/api";

async function reservarClase() {
    const user = JSON.parse(localStorage.getItem("user"));
    const claseData = JSON.parse(localStorage.getItem("claseSeleccionada"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }
    
    if (!claseData) {
        alert("No hay clase seleccionada");
        window.location.href = "buscar-profesores.html";
        return;
    }

    try {
        // Obtener los datos de la clase
        const claseRes = await fetch(`${API}/clases`);
        const todasClases = await claseRes.json();
        const clase = todasClases.find(c => c.id === claseData.claseId);

        if (!clase) {
            alert("Clase no encontrada");
            return;
        }

        // Crear reserva
        const reserva = {
            clase: { id: clase.id },
            estudiante: { id: user.id },
            estado: "PENDIENTE",
            fechaReserva: new Date().toISOString()
        };

        const res = await fetch(`${API}/reservas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reserva)
        });

        if (res.ok) {
            alert("Clase reservada correctamente");
            localStorage.removeItem("claseSeleccionada");
            window.location.href = "mis-clases-estudiante.html";
        } else {
            alert("Error al reservar clase");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al reservar clase");
    }
}

function cancelarReserva() {
    localStorage.removeItem("claseSeleccionada");
    window.location.href = "buscar-profesores.html";
}