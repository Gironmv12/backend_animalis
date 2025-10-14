import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';

@Controller('historiales')
export class HistorialMedicoController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Get(':mascotaId')
  async findByMascota(@Param('mascotaId', ParseIntPipe) mascotaId: number) {
    return this.expedientesService.findByMascota(mascotaId);
  }

  @Post()
  async create(@Body() dto: CreateHistorialDto) {
    return this.expedientesService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHistorialDto
  ) {
    return this.expedientesService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.expedientesService.remove(id);
  }
}
