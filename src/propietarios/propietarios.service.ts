import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropietarioDto } from './dto/createPropietario.dto';
import { UpdatePropietarioDto } from './dto/updatePropietario.dto';
import { PropietarioResponseDto } from './dto/propietarioResponse.dto';
import { PropietarioMascotaResponseDto } from './propietarioMascotaResponse.dto';
@Injectable()
export class PropietariosService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los propietarios
  async findAll(): Promise<PropietarioResponseDto[]> {
    const propietarios = await this.prisma.propietario.findMany();
    return propietarios.map((prop) => this.toPropietarioResponse(prop));
  }

  // Obtener un propietario por ID
  async findOne(idPropietario: number): Promise<PropietarioResponseDto> {
    const propietario = await this.prisma.propietario.findUnique({
      where: { idPropietario: idPropietario },
    });
    return this.toPropietarioResponse(propietario);
  }

  // Crear un nuevo propietario
  async create(dto: CreatePropietarioDto): Promise<PropietarioResponseDto> {
    const propietario = await this.prisma.propietario.create({
      data: {
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        correo: dto.correo,
        telefono: dto.telefono,
        direccion: dto.direccion,
        estado: dto.estado,
        notas: dto.notas,
        fechaUltimaVisita: dto.fechaUltimaVisita,
      },
    });
    return this.toPropietarioResponse(propietario);
  }

  // Actualizar un propietario
  async update(
    idUsuario: number,
    dto: UpdatePropietarioDto
  ): Promise<PropietarioResponseDto> {
    await this.findOne(idUsuario); //verificar que el propietario existe
    const data: any = { ...dto };
    if (dto.fechaUltimaVisita) {
      data.fechaUltimaVisita = new Date(dto.fechaUltimaVisita);
    }
    const propietario = await this.prisma.propietario.update({
      where: { idPropietario: idUsuario },
      data,
    });
    return this.toPropietarioResponse(propietario);
  }

  // Eliminar un propietario
  async remove(idPropietario: number): Promise<{ message: string }> {
    await this.findOne(idPropietario); //verificar que el propietario existe
    await this.prisma.propietario.delete({
      where: { idPropietario: idPropietario },
    });
    return { message: 'Propietario eliminado' };
  }

  async findMascotasByPropietario(
    id: number
  ): Promise<PropietarioMascotaResponseDto[]> {
    // Se asume que el modelo Mascota posee la propiedad "propietarioId".
    const mascotas = await this.prisma.mascota.findMany({
      where: { propietarioId: id },
    });
    return mascotas.map((mascota) => ({
      idMascota: mascota.idMascota,
      nombre: mascota.nombre,
      especie: mascota.especie ?? '',
      raza: mascota.raza ?? '',
      edad: mascota.edad ?? 0,
      genero: mascota.genero ?? '',
      peso: typeof mascota.peso === 'number' ? mascota.peso : 0,
      color: mascota.color ?? '',
      fechaNacimiento: mascota.fechaNacimiento ?? new Date(),
      microchip: mascota.microchip ?? '',
      estado: mascota.estado ?? '',
      notas: mascota.notas ?? '',
      fechaUltimaVisita: mascota.fechaUltimaVisita ?? new Date(),
      foto: mascota.foto ?? '',
    }));
  }

  // Obtener un propietario junto con sus mascotas
  private toPropietarioResponse(prop: any): PropietarioResponseDto {
    return {
      id: String(prop.idPropietario),
      nombre: prop.nombre,
      apellidos: prop.apellidos,
      correo: prop.correo,
      telefono: prop.telefono,
      direccion: prop.direccion,
      estado: prop.estado,
      notas: prop.notas,
      fechaUltimaVisita: prop.fechaUltimaVisita,
    };
  }
}
