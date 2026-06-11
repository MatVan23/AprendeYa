const API = "http://localhost:8082/api";

async function guardarClase() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        alert("Debes estar registrado");
        window.location.href = "login.html";
        return;
    }

    const materia = document.getElementById("materia").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const fechaHora = document.getElementById("fechaHora").value;

    if (!materia || !descripcion || !precio || !fechaHora) {
        alert("Por favor completa todos los campos");
        return;
    }

    try {
        // Primero obtener el profesor asociado al usuario
        const profesorRes = await fetch(`${API}/profesores/usuario/${user.id}`);
        
        if (!profesorRes.ok) {
            alert("No tienes perfil de profesor configurado");
            return;
        }

        const profesor = await profesorRes.json();

        const clase = {
            profesor: { id: profesor.id },
            materia: materia,
            descripcion: descripcion,
            precio: parseFloat(precio),
            fechaHora: fechaHora,
            estado: "DISPONIBLE"
        };

        const res = await fetch(`${API}/clases`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clase)
        });

        if (res.ok) {
            alert("Clase publicada correctamente");
            // Limpiar formulario
            document.getElementById("materia").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("fechaHora").value = "";
        } else {
            alert("Error al publicar clase");
        }
    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }
}