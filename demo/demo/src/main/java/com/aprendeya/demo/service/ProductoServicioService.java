package com.aprendeya.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.EstadoValidacion;
import com.aprendeya.demo.model.ProductoServicio;
import com.aprendeya.demo.repository.ProductoServicioRepository;

@Service
public class ProductoServicioService {

    @Autowired
    private ProductoServicioRepository repository;

    public ProductoServicio guardar(ProductoServicio producto) {
        return repository.save(producto);
    }

    public List<ProductoServicio> listarTodos() {
        return repository.findAll();
    }

    public ProductoServicio obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    // ==========================
    // SPRINT 3
    // ==========================

    public List<ProductoServicio> listarAprobados() {
        return repository.findByEstado(EstadoValidacion.APROBADO);
    }

    public List<ProductoServicio> listarPorCategoria(String categoria) {
        return repository.findByCategoria(categoria);
    }

    public List<ProductoServicio> listarRecientes() {
        return repository.findAllByOrderByFechaCreacionDesc();
    }

    public List<ProductoServicio> listarMasUtilizados() {
        return repository.findAllByOrderByCantidadSolicitudesDesc();
    }

    public List<ProductoServicio> listarMejorCalificados() {
        return repository.findAllByOrderByCalificacionDesc();
    }

}