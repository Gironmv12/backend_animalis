import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { MascotaResponseDto } from './dto/mascota-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller('mascotas')
export class MascostasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  async findAll(): Promise<MascotaResponseDto[]> {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MascotaResponseDto> {
    return this.mascotasService.findOne(+id);
  }

  @Post()
  async create(@Body() dto: CreateMascotaDto): Promise<MascotaResponseDto> {
    return this.mascotasService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMascotaDto
  ): Promise<MascotaResponseDto> {
    return this.mascotasService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.mascotasService.remove(+id);
  }

  @Post(':id/foto')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.mascotasService.uploadFoto(+id, file);
  }

  @Get(':id/foto/view')
  async verFoto(@Param('id') id: string, @Res() res: Response) {
    const mascota = await this.mascotasService.findOne(+id);
    if (!mascota.foto) {
      return res.status(404).json({ message: 'Mascota sin foto' });
    }
    const fileStream = this.mascotasService.getFotoStream(mascota.foto);
    fileStream.on('error', () =>
      res.status(404).json({ message: 'Foto no encontrada' })
    );
    res.setHeader('Content-Type', 'image/jpeg'); // O ajusta según el tipo
    fileStream.pipe(res);
  }
}
