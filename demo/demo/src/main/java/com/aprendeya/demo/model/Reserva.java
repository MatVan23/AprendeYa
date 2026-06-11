package com.aprendeya.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "clase_id")
    private ClasePublicada clase;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    private Usuario estudiante;

    private LocalDateTime fechaReserva;

    private String estado;

    private String linkClase;

    @Column(length = 1000)
    private String observaciones;

    public Reserva() {
        this.fechaReserva = LocalDateTime.now();
        this.estado = "PENDIENTE";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ClasePublicada getClase() {
        return clase;
    }

    public void setClase(ClasePublicada clase) {
        this.clase = clase;
    }

    public Usuario getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Usuario estudiante) {
        this.estudiante = estudiante;
    }

    public LocalDateTime getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDateTime fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getLinkClase() {
        return linkClase;
    }

    public void setLinkClase(String linkClase) {
        this.linkClase = linkClase;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}