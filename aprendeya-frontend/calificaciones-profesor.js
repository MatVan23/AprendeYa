const API = "http://localhost:8082/api";

async function cargarCalificaciones() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        // Obtener perfil de profesor
        const profRes = await fetch(`${API}/profesores/usuario/${user.id}`);
        if (!profRes.ok) {
            document.getElementById("calificaciones").innerHTML = "<p>No tienes perfil de profesor.</p>";
            return;
        }
        const profesor = await profRes.json();

        // Obtener calificaciones del profesor
        const res = await fetch(`${API}/calificaciones/profesor/${profesor.id}`);
        
        const cont = document.getElementById("calificaciones");

        if (!res.ok) {
            document.getElementById("promedio").textContent = "--";
            document.getElementById("totalCalif").textContent = "0";
            document.getElementById("satisfaccion").textContent = "--";
            cont.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Aún no tienes calificaciones.</p>";
            return;
        }

        const calificaciones = await res.json();

        if (calificaciones.length === 0) {
            document.getElementById("promedio").textContent = "--";
            document.getElementById("totalCalif").textContent = "0";
            document.getElementById("satisfaccion").textContent = "--";
            cont.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Aún no tienes calificaciones.</p>";
            return;
        }

        // Estadísticas
        const total = calificaciones.length;
        const suma = calificaciones.reduce((acc, c) => acc + c.puntuacion, 0);
        const promedio = (suma / total).toFixed(1);
        const satisfaccionPct = Math.round((suma / (total * 5)) * 100);

        document.getElementById("promedio").textContent = promedio;
        document.getElementById("totalCalif").textContent = total;
        document.getElementById("satisfaccion").textContent = satisfaccionPct + "%";

        // Tarjetas de calificaciones
        cont.innerHTML = "";
        calificaciones.forEach(c => {
            const estrellas = "⭐".repeat(c.puntuacion) + "☆".repeat(5 - c.puntuacion);
            const fecha = c.fecha ? new Date(c.fecha).toLocaleDateString() : "";
            const nombreEstudiante = c.estudiante?.usuario?.nombre || c.estudiante?.nombre || "Estudiante";
            cont.innerHTML += `
            <div class="card" style="border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <p style="font-weight: bold; font-size: 16px;">👤 ${nombreEstudiante}</p>
                        <p style="font-size: 22px; margin: 6px 0;">${estrellas}</p>
                        <p style="font-size: 18px; color: var(--primary); font-weight: bold;">${c.puntuacion}/5</p>
                    </div>
                    ${fecha ? `<span style="font-size: 12px; color: var(--text-muted);">${fecha}</span>` : ""}
                </div>
                ${c.comentario ? `
                <div style="margin-top: 12px; padding: 12px; background: var(--bg-secondary, #f8f9fa); border-radius: 8px;">
                    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">💬 Comentario:</p>
                    <p style="font-style: italic;">"${c.comentario}"</p>
                </div>` : ""}
            </div>`;
        });

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("calificaciones").innerHTML = "<p style='text-align:center;'>Error al cargar calificaciones.</p>";
    }
}

cargarCalificaciones();
