import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { PeriodFilterDto } from './dto/period-filter.dto';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('total-pacientes')
  async totalPacientes() {
    return { total: await this.reportesService.totalPacientes() };
  }

  @Get('consultas-este-mes')
  async consultasEsteMes() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return { total: await this.reportesService.consultasEnPeriodo(start, end) };
  }

  @Get('vacunas-aplicadas')
  async vacunasAplicadas(@Query() q: PeriodFilterDto) {
    const start = q.start ? new Date(q.start) : undefined;
    const end = q.end ? new Date(q.end) : undefined;
    return { total: await this.reportesService.vacunasAplicadas(start, end) };
  }

  @Get('propietarios-activos')
  async propietariosActivos() {
    return { total: await this.reportesService.propietariosActivos() };
  }

  @Get('actividad-mensual')
  async actividadMensual(@Query() q: PeriodFilterDto) {
    const now = new Date();
    const start = q.start
      ? new Date(q.start)
      : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = q.end
      ? new Date(q.end)
      : new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return await this.reportesService.actividadMensual(start, end);
  }

  @Get('distribucion-especies')
  async distribucionEspecies() {
    return await this.reportesService.distribucionPorEspecies();
  }

  @Get('recomendaciones')
  async recomendaciones(@Query() q: PeriodFilterDto) {
    const limit = q.limit ?? 10;
    return await this.reportesService.recomendaciones(limit);
  }
}
