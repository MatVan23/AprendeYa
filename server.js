const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("views"));

const db = new sqlite3.Database("./database.db");

// Crear tabla
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT UNIQUE,
    password TEXT
)`);

// CREATE
app.post("/usuarios", (req, res) => {
    const { nombre, email, password } = req.body;
    db.run("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
        [nombre, email, password],
        function(err) {
            if (err) return res.send("Error al crear usuario");
            res.send("Usuario creado");
        });
});

// READ
app.get("/usuarios", (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        res.json(rows);
    });
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
    const { nombre, email, password } = req.body;
    db.run("UPDATE usuarios SET nombre=?, email=?, password=? WHERE id=?",
        [nombre, email, password, req.params.id],
        (err) => {
            res.send("Usuario actualizado");
        });
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
    db.run("DELETE FROM usuarios WHERE id=?", req.params.id);
    res.send("Usuario eliminado");
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM usuarios WHERE email=? AND password=?",
        [email, password],
        (err, row) => {
            if (row) {
                res.send("Login correcto");
            } else {
                res.send("Credenciales incorrectas");
            }
        });
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});