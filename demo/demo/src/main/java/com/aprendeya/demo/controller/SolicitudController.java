package com.aprendeya.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.Solicitud;
import com.aprendeya.demo.service.SolicitudService;

@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin(origins = "*")
public class SolicitudController {

    @Autowired
    private SolicitudService service;

    @GetMapping
    public List<Solicitud> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solicitud> obtenerPorId(
            @PathVariable Long id) {

        Solicitud solicitud = service.obtenerPorId(id);

        if (solicitud == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(solicitud);
    }

    @PostMapping
    public Solicitud crear(
            @RequestBody Solicitud solicitud) {

        return service.guardar(solicitud);
    }

    @PutMapping("/{id}/aceptar")
    public ResponseEntity<Solicitud> aceptar(
            @PathVariable Long id) {

        Solicitud solicitud = service.aceptar(id);

        if (solicitud == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(solicitud);
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<Solicitud> rechazar(
            @PathVariable Long id) {

        Solicitud solicitud = service.rechazar(id);

        if (solicitud == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(solicitud);
    }
}
