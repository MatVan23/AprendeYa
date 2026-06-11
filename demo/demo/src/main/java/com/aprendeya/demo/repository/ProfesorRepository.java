package com.aprendeya.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aprendeya.demo.model.Profesor;
import com.aprendeya.demo.model.Usuario;

public interface ProfesorRepository
        extends JpaRepository<Profesor, Long> {

    List<Profesor> findByMateriasContainingIgnoreCase(
            String materia);
    
    Optional<Profesor> findByUsuario(Usuario usuario);

}