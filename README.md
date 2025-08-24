# Animalis Backend

Este proyecto es el backend para la aplicación Animalis, una solución diseñada para gestionar de manera integral la información de una clínica veterinaria.

## Descripción

El backend está desarrollado utilizando [NestJS](https://nestjs.com/) y [Prisma](https://www.prisma.io/). Se encarga de manejar las principales funcionalidades de gestión de datos, tales como:

- Gestión de usuarios con roles (administrador, asistente, veterinario).
- Gestión de propietarios y mascotas, incluyendo historiales médicos y registros de vacunación.
- Agenda de citas para consultas, tratamientos, cirugías y vacunaciones.
- Manejo de relaciones entre citas, mascotas, propietarios y usuarios.

## Objetivos del Proyecto

El objetivo principal de este proyecto es proporcionar una API robusta y escalable para una clínica veterinaria, permitiendo:

- Manejo seguro y eficiente de la información.
- Integración con bases de datos PostgreSQL a través de Prisma.
- Extensibilidad para futuras funcionalidades como autenticación, autorización y más.

## Estructura del Proyecto

- **src/**: Contiene el código fuente del backend.
- **prisma/**: Archivos de configuración de Prisma y el esquema de la base de datos.
- **generated/**: Código generado por Prisma para la conexión con la base de datos.

## Instalación y Ejecución

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Configurar la variable de entorno `DATABASE_URL` con la conexión a la base de datos PostgreSQL.
3. Ejecutar el proyecto en modo de desarrollo:
   ```bash
   npm run start:dev
   ```

## Contribución y Evolución

El proyecto se documentará y mejorará gradualmente. Se irán añadiendo nuevas funcionalidades y mejoras en base a los requerimientos y feedback de los usuarios.
