package com.aprendeya.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aprendeya.demo.model.Calificacion;
import com.aprendeya.demo.model.Usuario;

@Repository
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    List<Calificacion> findByEstudiante(Usuario estudiante);
    
    List<Calificacion> findByProfesor_Usuario(Usuario profesor);
    
    List<Calificacion> findByProfesorId(Long profesorId);  // ← AGREGA ESTA LÍNEA

}