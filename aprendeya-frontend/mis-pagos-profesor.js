const API = "https://aprendeya-backend.onrender.com/api";
let clasesDisponibles = [];

async function cargarClasesParaPagos() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch(`${API}/reservas/profesor/${user.id}/todas`);
        
        if (!res.ok) {
            alert("Error al cargar clases");
            return;
        }

        const clases = await res.json();
        clasesDisponibles = clases.filter(c => c.estado === "ACEPTADA");
        
        const select = document.getElementById("reservaId");
        select.innerHTML = '<option value="">-- Selecciona una clase --</option>';

        clasesDisponibles.forEach(c => {
            select.innerHTML += `
            <option value="${c.id}" data-precio="${c.clase.precio}">
                ${c.clase.materia} - ${c.estudiante.nombre} (${new Date(c.clase.fechaHora).toLocaleString()})
            </option>`;
        });
        
        await cargarQRs();
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar clases");
    }
}

function autocompletarMonto() {
    const select = document.getElementById("reservaId");
    const selected = select.options[select.selectedIndex];
    const precio = selected ? selected.getAttribute("data-precio") : "";
    if (precio) {
        document.getElementById("monto").value = precio;
    } else {
        document.getElementById("monto").value = "";
    }
}

async function cargarQRs() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
        const res = await fetch(`${API}/pagos/profesor/${user.id}`);
        const tbody = document.querySelector("#tablaQRs tbody");
        
        if (!res.ok) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align: center;'>No hay QRs registrados</td></tr>";
            return;
        }

        const pagos = await res.json();
        tbody.innerHTML = "";

        if (pagos.length === 0) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align: center;'>No hay QRs registrados</td></tr>";
            return;
        }

        pagos.forEach(pago => {
            const qrDisplay = pago.qrImagen ? 
                `<img src="${pago.qrImagen}" alt="QR" style="max-width: 80px; cursor: pointer;" onclick="verQR('${pago.qrImagen}')">` 
                : "-";
            
            const estadoBtn = pago.pagado 
                ? `<span style="background:#10b981; color:white; padding:6px 12px; border-radius:6px; font-weight:bold;">✓ Pagado</span>`
                : `<button 
                        id="btn-pago-${pago.id}"
                        onclick="marcarPagado(${pago.id})" 
                        style="background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">
                        ⏳ Marcar como pagado
                   </button>`;
            
            tbody.innerHTML += `
            <tr id="fila-${pago.id}">
                <td>${pago.id}</td>
                <td>${pago.reserva?.estudiante?.nombre || "-"}</td>
                <td>${pago.reserva?.clase?.materia || "-"}</td>
                <td>${pago.monto} Bs</td>
                <td id="estado-${pago.id}">${estadoBtn}</td>
                <td>${qrDisplay}</td>
            </tr>`;
        });
    } catch (error) {
        console.error("Error:", error);
        document.querySelector("#tablaQRs tbody").innerHTML = "<tr><td colspan='6' style='text-align: center;'>Error al cargar QRs</td></tr>";
    }
}

async function marcarPagado(pagoId) {
    if (!confirm("¿Confirmas que recibiste el pago?")) return;

    // Cambio visual inmediato mientras espera la respuesta
    const estadoCell = document.getElementById(`estado-${pagoId}`);
    if (estadoCell) {
        estadoCell.innerHTML = `<span style="background:#6b7280; color:white; padding:6px 12px; border-radius:6px;">⏳ Procesando...</span>`;
    }

    try {
        const res = await fetch(`${API}/pagos/${pagoId}/pagar`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            // Cambio visual inmediato a verde sin recargar toda la tabla
            if (estadoCell) {
                estadoCell.innerHTML = `<span style="background:#10b981; color:white; padding:6px 12px; border-radius:6px; font-weight:bold;">✓ Pagado</span>`;
            }
        } else {
            alert("Error al actualizar el pago");
            // Revertir si falló
            if (estadoCell) {
                estadoCell.innerHTML = `<button onclick="marcarPagado(${pagoId})" style="background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">⏳ Marcar como pagado</button>`;
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
        if (estadoCell) {
            estadoCell.innerHTML = `<button onclick="marcarPagado(${pagoId})" style="background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">⏳ Marcar como pagado</button>`;
        }
    }
}

function verQR(qrImagen) {
    const ventana = window.open();
    ventana.document.write(`<img src="${qrImagen}" style="max-width: 100%;">`);
}

function comprimirImagen(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement("canvas");
                const MAX = 800;
                let w = img.width, h = img.height;
                if (w > MAX || h > MAX) {
                    if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
                    else { w = Math.round(w * MAX / h); h = MAX; }
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL("image/jpeg", 0.7));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function subirQR() {
    const reservaId = document.getElementById("reservaId").value;
    const monto = document.getElementById("monto").value;
    const qrInput = document.getElementById("qrImagen");
    const mensajeDiv = document.getElementById("mensajeQR");
    
    if (!reservaId || !monto || !qrInput.files[0]) {
        mensajeDiv.style.display = "block";
        mensajeDiv.className = "error";
        mensajeDiv.textContent = "❌ Por favor completa todos los campos";
        return;
    }

    mensajeDiv.style.display = "block";
    mensajeDiv.className = "";
    mensajeDiv.textContent = "⏳ Procesando imagen...";

    try {
        const qrBase64 = await comprimirImagen(qrInput.files[0]);
        
        const pago = {
            monto: parseFloat(monto),
            qrImagen: qrBase64,
            reserva: { id: parseInt(reservaId) },
            pagado: false
        };

        const res = await fetch(`${API}/pagos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pago)
        });

        if (res.ok) {
            mensajeDiv.className = "success";
            mensajeDiv.textContent = "✓ QR subido correctamente";
            document.getElementById("reservaId").value = "";
            document.getElementById("monto").value = "";
            qrInput.value = "";
            setTimeout(() => { mensajeDiv.style.display = "none"; }, 3000);
            await cargarQRs();
        } else {
            const error = await res.text();
            mensajeDiv.className = "error";
            mensajeDiv.textContent = "❌ Error al subir QR: " + error;
        }
    } catch (error) {
        console.error("Error:", error);
        mensajeDiv.className = "error";
        mensajeDiv.textContent = "❌ Error al procesar el archivo";
    }
}

cargarClasesParaPagos();
