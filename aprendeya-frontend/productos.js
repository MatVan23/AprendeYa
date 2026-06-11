const API =
"http://localhost:8082/api/productos";

async function cargarProductos() {

    const res = await fetch(API);

    const productos =
    await res.json();

    let tabla =
    document.getElementById(
        "tablaProductos"
    );

    tabla.innerHTML = "";

    productos.forEach(p => {

        tabla.innerHTML += `
        <tr>

            <td>${p.id}</td>

            <td>${p.titulo}</td>

            <td>${p.precio}</td>

            <td>${p.categoria}</td>

            <td>${p.estado}</td>

            <td>${p.calificacion}</td>

            <td>

                <button onclick="aprobar(${p.id})">
                Aprobar
                </button>

                <button onclick="rechazar(${p.id})">
                Rechazar
                </button>

                <button onclick="eliminar(${p.id})">
                Eliminar
                </button>

            </td>

        </tr>
        `;
    });

}

async function guardarProducto() {

    const producto = {

        titulo:
        document.getElementById(
            "titulo"
        ).value,

        descripcion:
        document.getElementById(
            "descripcion"
        ).value,

        precio: parseFloat(
            document.getElementById(
                "precio"
            ).value
        ),

        categoria:
        document.getElementById(
            "categoria"
        ).value

    };

    await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(producto)

    });

    cargarProductos();
}

async function aprobar(id) {

    await fetch(
        `${API}/${id}/aprobar`,
        {
            method:"PUT"
        }
    );

    cargarProductos();
}

async function rechazar(id) {

    await fetch(
        `${API}/${id}/rechazar`,
        {
            method:"PUT"
        }
    );

    cargarProductos();
}

async function eliminar(id) {

    await fetch(
        `${API}/${id}`,
        {
            method:"DELETE"
        }
    );

    cargarProductos();
}

function filtrarMaterias() {

    let filtro =
    document.getElementById(
        "buscar"
    ).value.toLowerCase();

    let filas =
    document.querySelectorAll(
        "#tablaProductos tr"
    );

    filas.forEach(fila => {

        let materia =
        fila.children[1]
        .textContent
        .toLowerCase();

        fila.style.display =
        materia.includes(filtro)
        ? ""
        : "none";
    });
}

cargarProductos();