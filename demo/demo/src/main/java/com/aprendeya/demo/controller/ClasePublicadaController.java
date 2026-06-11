package com.aprendeya.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.ClasePublicada;
import com.aprendeya.demo.model.Profesor;
import com.aprendeya.demo.service.ClasePublicadaService;
import com.aprendeya.demo.service.ProfesorService;

@RestController
@RequestMapping("/api/clases")
@CrossOrigin(origins = "*")
public class ClasePublicadaController {

    @Autowired
    private ClasePublicadaService service;
    
    @Autowired
    private ProfesorService profesorService;

    @GetMapping
    public List<ClasePublicada> listar() {
        return service.listarTodas();
    }

    @GetMapping("/buscar/{materia}")
    public List<ClasePublicada> buscar(
            @PathVariable String materia) {

        return service.buscarMateria(
                materia);
    }

    @PostMapping
    public ClasePublicada guardar(
            @RequestBody ClasePublicada clase) {

        return service.guardar(clase);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        service.eliminar(id);
    }
    
    @GetMapping("/profesor/{profesorId}")
    public List<ClasePublicada> listarPorProfesor(@PathVariable Long profesorId) {
        Optional<Profesor> profesor = profesorService.obtenerPorUsuarioId(profesorId);
        if (profesor.isPresent()) {
            return service.listarPorProfesor(profesor.get());
        }
        return List.of();
    }
}