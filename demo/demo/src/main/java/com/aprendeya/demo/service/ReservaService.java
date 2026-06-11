package com.aprendeya.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.Reserva;
import com.aprendeya.demo.model.Usuario;
import com.aprendeya.demo.repository.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository repository;

    public List<Reserva> listarTodas() {
        return repository.findAll();
    }

    public Reserva guardar(Reserva reserva) {
        return repository.save(reserva);
    }

    public Reserva obtener(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public Reserva aceptar(Long id, String link) {

        Reserva reserva = obtener(id);

        if (reserva == null) {
            return null;
        }

        reserva.setEstado("ACEPTADA");
        reserva.setLinkClase(link);

        return repository.save(reserva);
    }

    public Reserva rechazar(Long id) {

        Reserva reserva = obtener(id);

        if (reserva == null) {
            return null;
        }

        reserva.setEstado("RECHAZADA");

        return repository.save(reserva);
    }
    
    public List<Reserva> listarPorEstudiante(Usuario estudiante) {
        return repository.findByEstudiante(estudiante);
    }
    
    public List<Reserva> listarPorProfesor(Usuario profesor) {
        return repository.findByClase_Profesor_Usuario(profesor);
    }
    
    public List<Reserva> listarPorEstudiantePendientes(Usuario estudiante) {
        return repository.findByEstudianteAndEstado(estudiante, "PENDIENTE");
    }
    
    public List<Reserva> listarSolicitudesPendientesDelProfesor(Usuario profesor) {
        return repository.findByClase_Profesor_UsuarioAndEstado(profesor, "PENDIENTE");
    }
}