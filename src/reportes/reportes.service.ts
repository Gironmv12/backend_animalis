import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private readonly prisma: PrismaService) {}

  async totalPacientes() {
    return this.prisma.mascota.count();
  }

  async consultasEnPeriodo(start?: Date, end?: Date) {
    const where: any = {};
    if (start || end) where.fecha = {};
    if (start) where.fecha.gte = start;
    if (end) where.fecha.lt = end;
    return this.prisma.cita.count({ where });
  }

  async vacunasAplicadas(start?: Date, end?: Date) {
    const where: any = {};
    if (start || end) where.fechaAplicacion = {};
    if (start) where.fechaAplicacion.gte = start;
    if (end) where.fechaAplicacion.lt = end;
    return this.prisma.mascotaVacuna.count({ where });
  }

  async propietariosActivos() {
    // EstadoUsuario enum has A for activo
    return this.prisma.propietario.count({ where: { estado: 'A' } });
  }

  async actividadMensual(start: Date, end: Date) {
    // Count by tipoRegistro for the given period
    const tipos = ['vacuna', 'tratamiento', 'cirugia', 'consulta'];
    const result: Record<string, number> = {};
    for (const tipo of tipos) {
      result[tipo] = await this.prisma.historialMedico.count({
        where: {
          tipoRegistro: tipo as any,
          fechaAplicacion: { gte: start, lt: end },
        },
      });
    }
    return result;
  }

  async distribucionPorEspecies() {
    // Group by especie and compute percentage
    const totals = await this.prisma.mascota.groupBy({
      by: ['especie'],
      _count: { _all: true },
    });
    const totalPatients = await this.prisma.mascota.count();
    return totals.map((t) => ({
      especie: t.especie,
      count: t._count._all,
      percentage: totalPatients ? (t._count._all / totalPatients) * 100 : 0,
    }));
  }

  async recomendaciones(limit = 10) {
    // Asegurarnos de que `limit` es un número (porque puede venir como string desde query params)
    const take = Number(limit) || 10;
    return this.prisma.historialMedico.findMany({
      where: { notas: { not: null } },
      orderBy: { fechaAplicacion: 'desc' },
      take,
      select: {
        idHistorial: true,
        mascotaId: true,
        fechaAplicacion: true,
        notas: true,
        tipoRegistro: true,
      },
    });
  }
}
