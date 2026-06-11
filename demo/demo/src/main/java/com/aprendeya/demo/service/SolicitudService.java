package com.aprendeya.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aprendeya.demo.model.EstadoSolicitud;
import com.aprendeya.demo.model.ProductoServicio;
import com.aprendeya.demo.model.Solicitud;
import com.aprendeya.demo.repository.ProductoServicioRepository;
import com.aprendeya.demo.repository.SolicitudRepository;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private ProductoServicioRepository productoRepository;

    public Solicitud guardar(Solicitud solicitud) {

        if (solicitud.getEstado() == null) {
            solicitud.setEstado(EstadoSolicitud.PENDIENTE);
        }

        if (solicitud.getFechaSolicitud() == null) {
            solicitud.setFechaSolicitud(LocalDateTime.now());
        }

        ProductoServicio producto = solicitud.getProducto();

        if (producto != null) {

            producto.setCantidadSolicitudes(
                    producto.getCantidadSolicitudes() + 1);

            productoRepository.save(producto);
        }

        return solicitudRepository.save(solicitud);
    }

    public List<Solicitud> listarTodas() {
        return solicitudRepository.findAll();
    }

    public Solicitud obtenerPorId(Long id) {
        return solicitudRepository.findById(id).orElse(null);
    }

    public Solicitud aceptar(Long id) {

        Solicitud solicitud = obtenerPorId(id);

        if (solicitud == null) {
            return null;
        }

        solicitud.setEstado(EstadoSolicitud.ACEPTADA);
        solicitud.setFechaRespuesta(LocalDateTime.now());

        return solicitudRepository.save(solicitud);
    }

    public Solicitud rechazar(Long id) {

        Solicitud solicitud = obtenerPorId(id);

        if (solicitud == null) {
            return null;
        }

        solicitud.setEstado(EstadoSolicitud.RECHAZADA);
        solicitud.setFechaRespuesta(LocalDateTime.now());

        return solicitudRepository.save(solicitud);
    }
}