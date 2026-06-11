package com.aprendeya.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aprendeya.demo.model.Reserva;
import com.aprendeya.demo.model.Usuario;

public interface ReservaRepository
        extends JpaRepository<Reserva, Long> {

    List<Reserva> findByEstado(String estado);
    
    List<Reserva> findByEstudiante(Usuario estudiante);
    
    List<Reserva> findByClase_Profesor_Usuario(Usuario profesor);
    
    List<Reserva> findByEstudianteAndEstado(Usuario estudiante, String estado);
    
    List<Reserva> findByClase_Profesor_UsuarioAndEstado(Usuario profesor, String estado);

}