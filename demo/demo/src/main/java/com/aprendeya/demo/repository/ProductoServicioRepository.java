package com.aprendeya.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aprendeya.demo.model.EstadoValidacion;
import com.aprendeya.demo.model.ProductoServicio;

@Repository
public interface ProductoServicioRepository extends JpaRepository<ProductoServicio, Long> {

    // Productos aprobados
    List<ProductoServicio> findByEstado(EstadoValidacion estado);

    // Buscar por categoría
    List<ProductoServicio> findByCategoria(String categoria);

    // Más recientes
    List<ProductoServicio> findAllByOrderByFechaCreacionDesc();

    // Más utilizados
    List<ProductoServicio> findAllByOrderByCantidadSolicitudesDesc();

    // Mejor calificados
    List<ProductoServicio> findAllByOrderByCalificacionDesc();

}