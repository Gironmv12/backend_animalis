import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto';
import { IsOptional, IsEnum, IsString, IsNumber } from 'class-validator';

export enum GeneroMascota {
  macho = 'macho',
  hembra = 'hembra',
}

export enum EstadoMascota {
  saludable = 'saludable',
  en_tratamiento = 'en_tratamiento',
  vacunacion = 'vacunacion',
}

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {
  @IsOptional()
  @IsEnum(EstadoMascota)
  estado?: EstadoMascota;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  microchip?: string;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsString()
  foto?: string;
}
