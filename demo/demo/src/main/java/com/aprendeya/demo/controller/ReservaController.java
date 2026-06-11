package com.aprendeya.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.Reserva;
import com.aprendeya.demo.model.Usuario;
import com.aprendeya.demo.service.ReservaService;
import com.aprendeya.demo.service.UsuarioService;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaService service;
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Reserva> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Reserva guardar(
            @RequestBody Reserva reserva) {

        return service.guardar(reserva);
    }

    @PutMapping("/{id}/aceptar")
    public Reserva aceptar(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return service.aceptar(
                id,
                body.get("linkClase"));
    }

    @PutMapping("/{id}/rechazar")
    public Reserva rechazar(
            @PathVariable Long id) {

        return service.rechazar(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id) {

        service.eliminar(id);
    }
    
    @GetMapping("/estudiante/{usuarioId}")
    public List<Reserva> listarPorEstudiante(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(usuarioId);
        if (usuario.isPresent()) {
            return service.listarPorEstudiante(usuario.get());
        }
        return List.of();
    }
    
    @GetMapping("/profesor/{usuarioId}")
    public List<Reserva> listarSolicitudesDelProfesor(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(usuarioId);
        if (usuario.isPresent()) {
            return service.listarSolicitudesPendientesDelProfesor(usuario.get());
        }
        return List.of();
    }
    
    @GetMapping("/profesor/{usuarioId}/todas")
    public List<Reserva> listarTodasDelProfesor(@PathVariable Long usuarioId) {
        Optional<Usuario> usuario = usuarioService.buscarPorId(usuarioId);
        if (usuario.isPresent()) {
            return service.listarPorProfesor(usuario.get());
        }
        return List.of();
    }
}