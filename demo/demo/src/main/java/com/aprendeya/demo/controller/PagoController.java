package com.aprendeya.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.Pago;
import com.aprendeya.demo.service.PagoService;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PagoController {

    @Autowired
    private PagoService service;

    @GetMapping
    public List<Pago> listar() {
        return service.listar();
    }

    @PostMapping
    public Pago crear(@RequestBody Pago pago) {
        return service.guardar(pago);
    }
    
    @GetMapping("/profesor/{profesorId}")
    public List<Pago> listarPorProfesor(@PathVariable Long profesorId) {
        return service.listarPorProfesor(profesorId);
    }
   
    @PutMapping("/{id}/pagar")
    public ResponseEntity<Pago> marcarComoPagado(@PathVariable Long id) {
        Pago pago = service.buscar(id);
        if (pago == null) {
            return ResponseEntity.notFound().build();
        }
        pago.setPagado(true);
        return ResponseEntity.ok(service.guardar(pago));
    }
}