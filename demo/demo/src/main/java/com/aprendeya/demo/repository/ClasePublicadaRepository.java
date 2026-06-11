package com.aprendeya.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aprendeya.demo.model.ClasePublicada;
import com.aprendeya.demo.model.Profesor;

public interface ClasePublicadaRepository
        extends JpaRepository<ClasePublicada, Long> {

    List<ClasePublicada>
    findByMateriaContainingIgnoreCase(
            String materia);
    
    List<ClasePublicada> findByProfesor(Profesor profesor);
    
    List<ClasePublicada> findByProfesorAndEstado(Profesor profesor, String estado);

}