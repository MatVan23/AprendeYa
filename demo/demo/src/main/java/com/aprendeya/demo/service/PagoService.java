package com.aprendeya.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.Pago;
import com.aprendeya.demo.repository.PagoRepository;

@Service
public class PagoService {

    @Autowired
    private PagoRepository repository;

    public List<Pago> listar() {
        return repository.findAll();
    }

    public Pago guardar(Pago pago) {
        return repository.save(pago);
    }

    public Pago buscar(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public List<Pago> listarPorProfesor(Long profesorId) {
        return repository.findByProfesorId(profesorId);
    }
}