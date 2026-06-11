package com.aprendeya.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aprendeya.demo.model.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    @Query("SELECT p FROM Pago p WHERE p.reserva.clase.profesor.usuario.id = ?1")
    List<Pago> findByProfesorId(Long profesorId);

}