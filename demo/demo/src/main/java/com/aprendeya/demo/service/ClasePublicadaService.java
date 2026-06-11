package com.aprendeya.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.ClasePublicada;
import com.aprendeya.demo.model.Profesor;
import com.aprendeya.demo.repository.ClasePublicadaRepository;

@Service
public class ClasePublicadaService {

    @Autowired
    private ClasePublicadaRepository repository;

    public List<ClasePublicada> listarTodas() {
        return repository.findAll();
    }

    public ClasePublicada guardar(
            ClasePublicada clase) {

        return repository.save(clase);
    }

    public ClasePublicada obtener(Long id) {

        return repository.findById(id)
                .orElse(null);
    }

    public void eliminar(Long id) {

        repository.deleteById(id);
    }

    public List<ClasePublicada> buscarMateria(
            String materia) {

        return repository
                .findByMateriaContainingIgnoreCase(
                        materia);
    }
    
    public List<ClasePublicada> listarPorProfesor(Profesor profesor) {
        return repository.findByProfesor(profesor);
    }
    
    public List<ClasePublicada> listarPorProfesorDisponibles(Profesor profesor) {
        return repository.findByProfesorAndEstado(profesor, "DISPONIBLE");
    }
}