package com.aprendeya.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.Profesor;
import com.aprendeya.demo.service.ProfesorService;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
public class ProfesorController {

    @Autowired
    private ProfesorService service;

    @GetMapping
    public List<Profesor> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> obtenerPorId(@PathVariable Long id) {
        Profesor profesor = service.obtener(id);
        if (profesor != null) {
            return ResponseEntity.ok(profesor);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Profesor> obtenerPorUsuario(@PathVariable Long usuarioId) {
        Optional<Profesor> profesor = service.obtenerPorUsuarioId(usuarioId);
        if (profesor.isPresent()) {
            return ResponseEntity.ok(profesor.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar/{materia}")
    public List<Profesor> buscar(
            @PathVariable String materia) {

        return service.buscarPorMateria(
                materia);
    }

    @PostMapping
    public Profesor guardar(
            @RequestBody Profesor profesor) {

        return service.guardar(profesor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizar(
            @PathVariable Long id,
            @RequestBody Profesor datos) {

        Profesor profesor = service.obtener(id);
        if (profesor == null) {
            return ResponseEntity.notFound().build();
        }

        profesor.setMaterias(datos.getMaterias());
        profesor.setExperiencia(datos.getExperiencia());
        profesor.setDisponibilidad(datos.getDisponibilidad());
        profesor.setDescripcion(datos.getDescripcion());

        return ResponseEntity.ok(service.guardar(profesor));
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        service.eliminar(id);
    }
}