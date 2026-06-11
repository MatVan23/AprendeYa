# ⚙️ INSTRUCCIONES FINALES - CONFIGURACIÓN

## 1️⃣ COMPILAR Y EJECUTAR EL BACKEND JAVA

```bash
cd demo/demo
mvn clean install
mvn spring-boot:run
```

**El backend estará en:** http://localhost:8082

---

## 2️⃣ INICIAR SERVIDOR NODE.JS (OPCIONAL)

Si necesitas un servidor adicional:

```bash
npm install
npm start
```

**El servidor estará en:** http://localhost:3000

---

## 3️⃣ ACCEDER A LA APLICACIÓN

### URL Frontend:
```
http://localhost:3000/aprendeya-frontend/index.html
```

O simplemente abre el archivo en el navegador (file:///...)

---

## 4️⃣ USUARIOS DE PRUEBA

**Para crear usuarios, usa:**
- POST `/api/usuarios` con datos: nombre, email, password, rol

Ejemplo:
```json
{
  "nombre": "Juan Profesor",
  "email": "profesor@test.com",
  "password": "123456",
  "rol": "PROFESOR"
}
```

---

## 5️⃣ NOTAS IMPORTANTES

### ✅ Modelos que ya existen:
- Usuario (con rol: PROFESOR, ESTUDIANTE, ADMINISTRADOR)
- Profesor (con experiencia, materias, disponibilidad)
- ClasePublicada (con materia, descripción, precio, fechaHora, estado)
- Reserva (con estado, linkClase, fechaReserva)
- Pago (con monto, qrImagen, pagado)
- Calificacion (con puntuacion, comentario)

### ⚠️ Cosas que falta configurar (si es necesario):

1. **Base de datos** - Asegúrate que está configurada en `application.properties`
2. **CORS** - Ya está habilitado en todos los controladores
3. **Validación de datos** - Se puede agregar @Valid en controladores
4. **Encriptación de contraseñas** - Considera usar BCrypt

---

## 6️⃣ ESTRUCTURA DE CARPETAS

```
SIS324-main/
├── aprendeya-frontend/
│   ├── *.html (páginas)
│   ├── *.js (lógica)
│   └── styles.css
├── demo/demo/ (Backend Java)
│   ├── src/
│   │   ├── main/java/com/aprendeya/demo/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── controller/
│   │   └── resources/
│   └── pom.xml
└── IMPLEMENTACION_RESUMEN.md
```

---

## 7️⃣ FLUJO DE TESTEO RECOMENDADO

1. **Crear usuarios** - 1 profesor + 1 estudiante
2. **Login como profesor** - Publicar una clase
3. **Login como estudiante** - Buscar y reservar clase
4. **Login como profesor** - Ver solicitud y aceptar (agregar link)
5. **Login como estudiante** - Ver clase aceptada + link
6. **Login como profesor** - Subir QR de pago
7. **Login como estudiante** - Ver QR en pagos
8. **Login como estudiante** - Calificar al profesor

---

## 8️⃣ POSIBLES ERRORES Y SOLUCIONES

### Error: "Connection refused"
- Backend no está corriendo. Ejecuta `mvn spring-boot:run`

### Error: "Cannot GET /api/..."
- Verifica la URL del API en los archivos JS (debe ser `http://localhost:8082`)

### Error: CORS
- Ya está configurado. Si persiste, verifica `@CrossOrigin(origins = "*")`

### Error: "Usuario no encontrado"
- Asegúrate de haber creado el usuario antes

---

## 9️⃣ PRÓXIMAS MEJORAS SUGERIDAS

- [ ] Agregar autenticación JWT
- [ ] Encriptar contraseñas con BCrypt
- [ ] Agregar validaciones en el backend
- [ ] Implementar manejo de errores mejorado
- [ ] Agregar tests unitarios
- [ ] Mejorar UI/UX con Bootstrap o Tailwind
- [ ] Agregar notificaciones en tiempo real (WebSocket)
- [ ] Implementar descarga de reportes

---

## 🔟 CONTACTO / SOPORTE

Si algo no funciona:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa los logs del backend
3. Verifica que los endpoints están correctos
4. Comprueba que el usuario está autenticado (localStorage)

---

**Implementado por:** GitHub Copilot
**Fecha:** 10/06/2026
**Estado:** ✅ LISTO PARA TESTEAR
