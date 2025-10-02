import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { MascotaResponseDto } from './dto/mascota-response.dto';
import { MascotasFilesService } from './mascotas-files.service';

@Injectable()
export class MascotasService {
  constructor(
    private prisma: PrismaService,
    private mascotasFilesService: MascotasFilesService
  ) {}

  // Listar todas las mascotas
  async findAll(): Promise<MascotaResponseDto[]> {
    const mascotas = await this.prisma.mascota.findMany();
    return await Promise.all(mascotas.map((m) => this.toMascotaResponse(m)));
  }

  // Obtener una mascota por su ID
  async findOne(id: number): Promise<MascotaResponseDto> {
    const mascota = await this.prisma.mascota.findUnique({
      where: { idMascota: id },
    });
    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    return this.toMascotaResponse(mascota);
  }

  async create(dto: CreateMascotaDto): Promise<MascotaResponseDto> {
    const mascota = await this.prisma.mascota.create({ data: dto });
    return this.toMascotaResponse(mascota);
  }

  async update(id: number, dto: UpdateMascotaDto): Promise<MascotaResponseDto> {
    await this.findOne(id);
    const mascota = await this.prisma.mascota.update({
      where: { idMascota: id },
      data: dto,
    });
    return this.toMascotaResponse(mascota);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.mascota.delete({ where: { idMascota: id } });
    return { message: 'Mascota eliminada' };
  }

  async uploadFoto(id: number, file: Express.Multer.File) {
    await this.findOne(id);
    const fileId = await this.mascotasFilesService.uploadFile(file);
    await this.prisma.mascota.update({
      where: { idMascota: id },
      data: { foto: String(fileId) },
    });
    return { message: 'Foto subida', fileId };
  }

  getFotoStream(fileId: string) {
    return this.mascotasFilesService.getFileStream(fileId);
  }

  private async toMascotaResponse(mascota: any): Promise<MascotaResponseDto> {
    const propietario = await this.prisma.propietario.findUnique({
      where: { idPropietario: mascota.propietarioId },
      select: { nombre: true },
    });

    return {
      idMascota: mascota.idMascota,
      nombre: mascota.nombre,
      especie: mascota.especie ?? null,
      raza: mascota.raza ?? null,
      edad: mascota.edad ?? null,
      genero: mascota.genero ?? null,
      fechaNacimiento: mascota.fechaNacimiento ?? null,
      propietarioId: mascota.propietarioId ?? null,
      propietarioNombre: propietario?.nombre ?? undefined,
      estado: mascota.estado ?? null,
      color: mascota.color ?? null,
      microchip: mascota.microchip ?? null,
      peso: mascota.peso ?? null,
      notas: mascota.notas ?? null,
      foto: mascota.foto ?? null,
    };
  }
}
