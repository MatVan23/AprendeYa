const API = "https://aprendeya-backend.onrender.com/api";

async function cargarPagos() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    const cont = document.getElementById("pagos");
    cont.innerHTML = "<p style='text-align:center;'>⏳ Cargando pagos...</p>";

    try {
        const res = await fetch(`${API}/reservas/estudiante/${user.id}`);
        
        if (!res.ok) {
            cont.innerHTML = "<p style='text-align:center; color: var(--text-muted);'>Error al cargar pagos.</p>";
            return;
        }

        const clases = await res.json();
        const clasesAceptadas = clases.filter(c => c.estado === "ACEPTADA");
        
        cont.innerHTML = "";

        if (clasesAceptadas.length === 0) {
            cont.innerHTML = "<p style='text-align: center; color: var(--text-muted);'>No tienes clases aceptadas para pagar.</p>";
            return;
        }

        // Obtener todos los pagos disponibles
        let todosPagos = [];
        try {
            const pagoRes = await fetch(`${API}/pagos`);
            if (pagoRes.ok) {
                todosPagos = await pagoRes.json();
            }
        } catch (e) {
            console.warn("No se pudieron obtener los pagos globales", e);
        }

        for (const reserva of clasesAceptadas) {
            const pagosClase = todosPagos.filter(p => p.reserva && p.reserva.id === reserva.id);
            const nombreProfesor = reserva.clase?.profesor?.usuario?.nombre || "Profesor";
            const materia = reserva.clase?.materia || "Clase";
            const precio = reserva.clase?.precio || "";

            if (pagosClase.length > 0) {
                pagosClase.forEach(pago => {
                    const estadoColor = pago.pagado ? "#10b981" : "#f59e0b";
                    const estadoTexto = pago.pagado ? "✓ Pagado" : "⏳ Pendiente";

                    cont.innerHTML += `
                    <div class="card">
                        <h3 style="margin-bottom: 16px;">📚 ${materia}</h3>
                        <div style="display: grid; gap: 10px;">
                            <p><strong>Profesor:</strong> ${nombreProfesor}</p>
                            <p><strong>Precio:</strong> <strong style="color: var(--primary); font-size: 18px;">${pago.monto} Bs</strong></p>
                            <p><strong>Estado:</strong> 
                                <span style="background: ${estadoColor}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 14px;">
                                    ${estadoTexto}
                                </span>
                            </p>
                            <div style="border-top: 1px solid var(--border-color); padding-top: 14px; margin-top: 4px;">
                                ${pago.qrImagen ? `
                                    <p style="font-weight: bold; margin-bottom: 10px;">📱 Escanea este QR para pagar:</p>
                                    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; display: inline-block; border: 1px solid var(--border-color);">
                                        <img 
                                            src="${pago.qrImagen}" 
                                            alt="QR de Pago" 
                                            style="max-width: 220px; width: 100%; height: auto; display: block;"
                                            onerror="this.parentElement.innerHTML='<p style=\\'color:#ef4444;\\'>⚠️ No se pudo cargar la imagen QR</p>'"
                                        >
                                    </div>
                                ` : `<p style='color: var(--warning);'>⚠️ QR no disponible aún. El profesor está preparando el código.</p>`}
                            </div>
                        </div>
                    </div>`;
                });
            } else {
                cont.innerHTML += `
                <div class="card">
                    <h3 style="margin-bottom: 16px;">📚 ${materia}</h3>
                    <p><strong>Profesor:</strong> ${nombreProfesor}</p>
                    <p><strong>Precio:</strong> ${precio ? precio + " Bs" : "A confirmar"}</p>
                    <p style='color: var(--text-muted); margin-top: 10px;'>⏳ El profesor aún no ha compartido el QR de pago.</p>
                </div>`;
            }
        }
    } catch (error) {
        console.error("Error:", error);
        cont.innerHTML = "<p style='text-align:center;'>Error al cargar pagos.</p>";
    }
}

cargarPagos();
