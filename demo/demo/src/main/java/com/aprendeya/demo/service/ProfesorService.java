package com.aprendeya.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.Profesor;
import com.aprendeya.demo.model.Usuario;
import com.aprendeya.demo.repository.ProfesorRepository;
import com.aprendeya.demo.repository.UsuarioRepository;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository repository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Profesor> listarTodos() {
        return repository.findAll();
    }

    public Profesor guardar(Profesor profesor) {
        return repository.save(profesor);
    }

    public Profesor obtener(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public List<Profesor> buscarPorMateria(
            String materia) {

        return repository
                .findByMateriasContainingIgnoreCase(
                        materia);
    }
    
    public Optional<Profesor> obtenerPorUsuarioId(Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        if (usuario.isPresent()) {
            return repository.findByUsuario(usuario.get());
        }
        return Optional.empty();
    }
}