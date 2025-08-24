-- CreateEnum
CREATE TYPE "public"."Rol" AS ENUM ('administrador', 'asistente', 'veterinario');

-- CreateEnum
CREATE TYPE "public"."EstadoUsuario" AS ENUM ('A', 'I');

-- CreateEnum
CREATE TYPE "public"."GeneroMascota" AS ENUM ('macho', 'hembra');

-- CreateEnum
CREATE TYPE "public"."EstadoMascota" AS ENUM ('saludable', 'en_tratamiento', 'vacunacion');

-- CreateEnum
CREATE TYPE "public"."EstadoVacuna" AS ENUM ('completo', 'progreso', 'programado');

-- CreateEnum
CREATE TYPE "public"."Urgencia" AS ENUM ('baja', 'normal', 'alta');

-- CreateEnum
CREATE TYPE "public"."TipoRegistro" AS ENUM ('vacuna', 'tratamiento', 'cirugia', 'consulta');

-- CreateEnum
CREATE TYPE "public"."EstadoCita" AS ENUM ('pendiente', 'completada', 'cancelada');

-- CreateTable
CREATE TABLE "public"."cita" (
    "id_cita" SERIAL NOT NULL,
    "mascota_id" INTEGER,
    "propietario_id" INTEGER,
    "veterinario_id" INTEGER,
    "fecha" TIMESTAMP(6) NOT NULL,
    "motivo" TEXT,
    "estado" "public"."EstadoCita",

    CONSTRAINT "cita_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "public"."historial_medico" (
    "id_historial" SERIAL NOT NULL,
    "mascota_id" INTEGER,
    "tipo_registro" "public"."TipoRegistro",
    "titulo" VARCHAR(150),
    "descripcion" TEXT,
    "fecha_aplicacion" DATE NOT NULL,
    "proxima_fecha" DATE,
    "estado" "public"."EstadoVacuna",
    "urgencia" "public"."Urgencia",
    "peso" DECIMAL(5,2),
    "temperatura" DECIMAL(4,1),
    "medicamentos" TEXT,
    "notas" TEXT,
    "veterinario_id" INTEGER,

    CONSTRAINT "historial_medico_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "public"."mascota" (
    "id_mascota" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "especie" VARCHAR(50),
    "raza" VARCHAR(100),
    "edad" INTEGER,
    "genero" "public"."GeneroMascota",
    "peso" DECIMAL(5,2),
    "color" VARCHAR(50),
    "fecha_nacimiento" DATE,
    "microchip" VARCHAR(50),
    "estado" "public"."EstadoMascota",
    "notas" TEXT,
    "propietario_id" INTEGER,
    "fecha_ultima_visita" DATE,
    "foto" TEXT,

    CONSTRAINT "mascota_pkey" PRIMARY KEY ("id_mascota")
);

-- CreateTable
CREATE TABLE "public"."mascota_vacuna" (
    "id_mascota" INTEGER NOT NULL,
    "id_vacuna" INTEGER NOT NULL,
    "fecha_aplicacion" DATE NOT NULL,
    "proxima_fecha" DATE,
    "estado" "public"."EstadoVacuna",
    "urgencia" "public"."Urgencia",
    "veterinario_id" INTEGER,
    "notas" TEXT,

    CONSTRAINT "mascota_vacuna_pkey" PRIMARY KEY ("id_mascota","id_vacuna","fecha_aplicacion")
);

-- CreateTable
CREATE TABLE "public"."propietario" (
    "id_propietario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100),
    "correo" VARCHAR(120),
    "telefono" VARCHAR(20),
    "direccion" TEXT,
    "estado" "public"."EstadoUsuario" DEFAULT 'A',
    "notas" TEXT,
    "fecha_ultima_visita" DATE,

    CONSTRAINT "propietario_pkey" PRIMARY KEY ("id_propietario")
);

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100),
    "correo" VARCHAR(120) NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "public"."Rol",
    "estado" "public"."EstadoUsuario" DEFAULT 'A',
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."vacuna" (
    "id_vacuna" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "vacuna_pkey" PRIMARY KEY ("id_vacuna")
);

-- CreateIndex
CREATE UNIQUE INDEX "mascota_microchip_key" ON "public"."mascota"("microchip");

-- CreateIndex
CREATE UNIQUE INDEX "propietario_correo_key" ON "public"."propietario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "public"."usuario"("correo");

-- AddForeignKey
ALTER TABLE "public"."cita" ADD CONSTRAINT "cita_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "public"."mascota"("id_mascota") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cita" ADD CONSTRAINT "cita_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "public"."propietario"("id_propietario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."cita" ADD CONSTRAINT "cita_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "public"."usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."historial_medico" ADD CONSTRAINT "historial_medico_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "public"."mascota"("id_mascota") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."historial_medico" ADD CONSTRAINT "historial_medico_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "public"."usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascota" ADD CONSTRAINT "mascota_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "public"."propietario"("id_propietario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascota_vacuna" ADD CONSTRAINT "mascota_vacuna_id_mascota_fkey" FOREIGN KEY ("id_mascota") REFERENCES "public"."mascota"("id_mascota") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascota_vacuna" ADD CONSTRAINT "mascota_vacuna_id_vacuna_fkey" FOREIGN KEY ("id_vacuna") REFERENCES "public"."vacuna"("id_vacuna") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mascota_vacuna" ADD CONSTRAINT "mascota_vacuna_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "public"."usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
