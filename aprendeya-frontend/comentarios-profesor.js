const API = "http://localhost:8082/api";
let todosLosComentarios = [];

async function cargarComentarios() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    const cont = document.getElementById("listaComentarios");

    try {
        // Obtener perfil del profesor
        const profRes = await fetch(`${API}/profesores/usuario/${user.id}`);
        if (!profRes.ok) {
            cont.innerHTML = "<p style='text-align:center;'>No tienes perfil de profesor configurado.</p>";
            return;
        }
        const profesor = await profRes.json();

        // Obtener calificaciones (que incluyen comentarios)
        const res = await fetch(`${API}/calificaciones/profesor/${profesor.id}`);
        
        if (!res.ok) {
            cont.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Aún no tienes comentarios.</p>";
            actualizarEstadisticas([]);
            return;
        }

        const calificaciones = await res.json();
        todosLosComentarios = calificaciones;

        actualizarEstadisticas(calificaciones);
        renderizarComentarios(calificaciones);

    } catch (error) {
        console.error("Error:", error);
        cont.innerHTML = "<p style='text-align:center;'>Error al cargar comentarios.</p>";
    }
}

function actualizarEstadisticas(lista) {
    document.getElementById("totalComentarios").textContent = lista.length;
    const conTexto = lista.filter(c => c.comentario && c.comentario.trim() !== "");
    document.getElementById("conTexto").textContent = conTexto.length;
    
    if (lista.length > 0) {
        const prom = (lista.reduce((acc, c) => acc + c.puntuacion, 0) / lista.length).toFixed(1);
        document.getElementById("promedioComentarios").textContent = prom;
    } else {
        document.getElementById("promedioComentarios").textContent = "--";
    }
}

function renderizarComentarios(lista) {
    const cont = document.getElementById("listaComentarios");

    if (lista.length === 0) {
        cont.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>No hay comentarios con los filtros seleccionados.</p>";
        return;
    }

    cont.innerHTML = "";
    lista.forEach(c => {
        const estrellas = "⭐".repeat(c.puntuacion) + "☆".repeat(5 - c.puntuacion);
        const fecha = c.fecha ? new Date(c.fecha).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" }) : "";
        const nombreEstudiante = c.estudiante?.usuario?.nombre || c.estudiante?.nombre || "Estudiante anónimo";
        const tieneComentario = c.comentario && c.comentario.trim() !== "";

        const colorBorde = c.puntuacion >= 4 ? "var(--success)" : c.puntuacion === 3 ? "var(--warning)" : "#ef4444";

        cont.innerHTML += `
        <div class="card" style="border-left: 4px solid ${colorBorde}; transition: box-shadow 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: ${tieneComentario ? '12px' : '0'};">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; flex-shrink: 0;">
                        ${nombreEstudiante.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p style="font-weight: bold; font-size: 15px; margin: 0;">${nombreEstudiante}</p>
                        <p style="font-size: 20px; margin: 4px 0 0;">${estrellas} <span style="font-size: 14px; color: var(--text-muted);">${c.puntuacion}/5</span></p>
                    </div>
                </div>
                ${fecha ? `<span style="font-size: 12px; color: var(--text-muted); white-space: nowrap;">${fecha}</span>` : ""}
            </div>
            ${tieneComentario ? `
            <div style="padding: 14px; background: var(--bg-secondary, #f8f9fa); border-radius: 8px; position: relative;">
                <span style="position: absolute; top: -8px; left: 14px; font-size: 24px; color: var(--primary); line-height: 1;">"</span>
                <p style="font-style: italic; margin: 0; padding-top: 6px; line-height: 1.6;">${c.comentario}</p>
            </div>` : `
            <p style="color: var(--text-muted); font-size: 13px; font-style: italic; margin: 0;">Sin comentario escrito.</p>`}
        </div>`;
    });
}

function filtrarComentarios() {
    const estrellas = document.getElementById("filtroEstrellas").value;
    const texto = document.getElementById("filtroTexto").value;

    let filtrados = [...todosLosComentarios];

    if (estrellas) {
        filtrados = filtrados.filter(c => c.puntuacion === parseInt(estrellas));
    }

    if (texto === "con") {
        filtrados = filtrados.filter(c => c.comentario && c.comentario.trim() !== "");
    } else if (texto === "sin") {
        filtrados = filtrados.filter(c => !c.comentario || c.comentario.trim() === "");
    }

    renderizarComentarios(filtrados);
}

cargarComentarios();
