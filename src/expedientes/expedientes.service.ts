import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';

@Injectable()
export class ExpedientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findByMascota(mascotaId: number) {
    return this.prisma.historialMedico.findMany({
      where: { mascotaId },
      orderBy: { fechaAplicacion: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.historialMedico.findMany({
      orderBy: { fechaAplicacion: 'desc' },
    });
  }

  async create(data: CreateHistorialDto) {
    const payload: any = {
      mascotaId: data.mascotaId,
      tipoRegistro: data.tipoRegistro,
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaAplicacion: new Date(data.fechaAplicacion),
      proximaFecha: data.proximaFecha ? new Date(data.proximaFecha) : undefined,
      estado: data.estado,
      urgencia: data.urgencia,
      peso: data.peso,
      temperatura: data.temperatura,
      medicamentos: data.medicamentos,
      notas: data.notas,
      veterinarioId: data.veterinarioId,
    };

    return this.prisma.historialMedico.create({ data: payload });
  }

  async update(id: number, data: UpdateHistorialDto) {
    const exists = await this.prisma.historialMedico.findUnique({
      where: { idHistorial: id },
    });
    if (!exists) throw new NotFoundException('Registro no encontrado');

    const payload: any = { ...data };
    if (data.fechaAplicacion)
      payload.fechaAplicacion = new Date(data.fechaAplicacion as any);
    if (data.proximaFecha)
      payload.proximaFecha = new Date(data.proximaFecha as any);

    return this.prisma.historialMedico.update({
      where: { idHistorial: id },
      data: payload,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.historialMedico.findUnique({
      where: { idHistorial: id },
    });
    if (!exists) throw new NotFoundException('Registro no encontrado');
    await this.prisma.historialMedico.delete({ where: { idHistorial: id } });
    return { deleted: true };
  }
}
