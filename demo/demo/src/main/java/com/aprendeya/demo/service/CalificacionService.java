package com.aprendeya.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.Calificacion;
import com.aprendeya.demo.model.Usuario;
import com.aprendeya.demo.repository.CalificacionRepository;

@Service
public class CalificacionService {

    @Autowired
    private CalificacionRepository repository;

    public List<Calificacion> listar() {
    return repository.findAll();
}

public Calificacion guardar(Calificacion calificacion) {
    return repository.save(calificacion);
}

public List<Calificacion> listarPorEstudiante(Usuario estudiante) {
    return repository.findByEstudiante(estudiante);
}

public List<Calificacion> listarPorProfesor(Usuario profesor) {
    return repository.findByProfesor_Usuario(profesor);
}

public List<Calificacion> listarPorProfesorId(Long profesorId) {  // ← AGREGA ESTE MÉTODO
    return repository.findByProfesorId(profesorId);
}
}
