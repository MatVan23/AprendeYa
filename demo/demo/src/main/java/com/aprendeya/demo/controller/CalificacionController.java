package com.aprendeya.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.Calificacion;
import com.aprendeya.demo.model.Usuario;
import com.aprendeya.demo.service.CalificacionService;
import com.aprendeya.demo.service.UsuarioService;

@RestController
@RequestMapping("/api/calificaciones")
@CrossOrigin(origins = "*")
public class CalificacionController {

    @Autowired
    private CalificacionService service;
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Calificacion> listar() {
        return service.listar();
    }

    @PostMapping
    public Calificacion crear(
            @RequestBody Calificacion calificacion) {

        return service.guardar(calificacion);
    }
    
    @GetMapping("/estudiante/{usuarioId}")
    public List<Calificacion> listarPorEstudiante(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(usuarioId);
        if (usuario.isPresent()) {
            return service.listarPorEstudiante(usuario.get());
        }
        return List.of();
    }
    
    @GetMapping("/profesor/{profesorId}")
public List<Calificacion> listarPorProfesor(@PathVariable Long profesorId) {
    return service.listarPorProfesorId(profesorId);
}
}