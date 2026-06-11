const API =
"http://localhost:8082/api/solicitudes";

async function cargarSolicitudes(){

    const res = await fetch(API);

    const solicitudes = await res.json();

    let tabla =
    document.getElementById(
        "tablaSolicitudes"
    );

    tabla.innerHTML = "";

    solicitudes.forEach(s=>{

        tabla.innerHTML += `
        <tr>

            <td>${s.id}</td>

            <td>${s.descripcion}</td>

            <td>${s.estado}</td>

            <td>

                <button onclick="aceptar(${s.id})">
                Aceptar
                </button>

                <button onclick="rechazar(${s.id})">
                Rechazar
                </button>

            </td>

        </tr>
        `;
    });

}

async function aceptar(id){

    await fetch(
        `${API}/${id}/aceptar`,
        {method:"PUT"}
    );

    cargarSolicitudes();
}

async function rechazar(id){

    await fetch(
        `${API}/${id}/rechazar`,
        {method:"PUT"}
    );

    cargarSolicitudes();
}

cargarSolicitudes();