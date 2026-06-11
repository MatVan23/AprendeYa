package com.aprendeya.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aprendeya.demo.model.EstadoValidacion;
import com.aprendeya.demo.model.ProductoServicio;
import com.aprendeya.demo.service.ProductoServicioService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoServicioController {

    @Autowired
    private ProductoServicioService service;

    @GetMapping
    public List<ProductoServicio> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoServicio> buscar(@PathVariable Long id) {

        ProductoServicio producto = service.obtenerPorId(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(producto);
    }

    @PostMapping
    public ProductoServicio crear(@RequestBody ProductoServicio producto) {

        producto.setEstado(EstadoValidacion.PENDIENTE);

        return service.guardar(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoServicio> actualizar(
            @PathVariable Long id,
            @RequestBody ProductoServicio datos) {

        ProductoServicio producto = service.obtenerPorId(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        producto.setTitulo(datos.getTitulo());
        producto.setDescripcion(datos.getDescripcion());
        producto.setPrecio(datos.getPrecio());
        producto.setCategoria(datos.getCategoria());

        producto.setEstado(EstadoValidacion.PENDIENTE);

        return ResponseEntity.ok(service.guardar(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<ProductoServicio> aprobar(@PathVariable Long id) {

        ProductoServicio producto = service.obtenerPorId(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        producto.setEstado(EstadoValidacion.APROBADO);

        return ResponseEntity.ok(service.guardar(producto));
    }

    @PutMapping("/{id}/rechazar")
    public ResponseEntity<ProductoServicio> rechazar(@PathVariable Long id) {

        ProductoServicio producto = service.obtenerPorId(id);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        producto.setEstado(EstadoValidacion.RECHAZADO);

        return ResponseEntity.ok(service.guardar(producto));
    }

    // =====================================
    // SPRINT 3 - BUSQUEDA DE PRODUCTOS
    // =====================================

    @GetMapping("/aprobados")
    public List<ProductoServicio> listarAprobados() {
        return service.listarAprobados();
    }

    @GetMapping("/categoria/{categoria}")
    public List<ProductoServicio> listarPorCategoria(
            @PathVariable String categoria) {

        return service.listarPorCategoria(categoria);
    }

    @GetMapping("/recientes")
    public List<ProductoServicio> listarRecientes() {
        return service.listarRecientes();
    }

    @GetMapping("/mas-utilizados")
    public List<ProductoServicio> listarMasUtilizados() {
        return service.listarMasUtilizados();
    }

    @GetMapping("/mejor-calificados")
    public List<ProductoServicio> listarMejorCalificados() {
        return service.listarMejorCalificados();
    }
}