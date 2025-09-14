import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PropietariosService } from './propietarios.service';
import { CreatePropietarioDto } from './dto/createPropietario.dto';
import { UpdatePropietarioDto } from './dto/updatePropietario.dto';

@Controller('propietarios')
export class PropietariosController {
  constructor(private readonly propietariosService: PropietariosService) {}

  @Get()
  async findAll() {
    return this.propietariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.propietariosService.findOne(+id);
  }

  @Post()
  async create(@Body() createPropietarioDto: CreatePropietarioDto) {
    return this.propietariosService.create(createPropietarioDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropietarioDto: UpdatePropietarioDto
  ) {
    return this.propietariosService.update(+id, updatePropietarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.propietariosService.remove(+id);
  }

  @Get(':id/mascotas')
  async findMascotas(@Param('id') id: string) {
    return this.propietariosService.findMascotasByPropietario(+id);
  }

  @Get(':id/detalle')
  async findDetalle(@Param('id') id: string) {
    return this.propietariosService.findDetalleById(+id);
  }
}
