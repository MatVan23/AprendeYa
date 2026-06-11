const API =
"http://localhost:8082/api/productos";

async function buscar(){

const categoria =
document.getElementById(
"categoria"
).value;

const res =
await fetch(
`${API}/categoria/${categoria}`
);

const datos =
await res.json();

const tabla =
document.getElementById(
"tabla"
);

tabla.innerHTML="";

datos.forEach(p=>{

tabla.innerHTML += `
<tr>
<td>${p.titulo}</td>
<td>${p.descripcion}</td>
<td>${p.precio}</td>
</tr>
`;

});

}