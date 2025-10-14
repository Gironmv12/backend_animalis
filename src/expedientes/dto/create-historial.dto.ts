import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { TipoRegistro, EstadoVacuna, Urgencia } from '@prisma/client';

export class CreateHistorialDto {
  @IsInt()
  mascotaId: number;

  @IsEnum(TipoRegistro)
  tipoRegistro: TipoRegistro;

  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  fechaAplicacion: string;

  @IsDateString()
  @IsOptional()
  proximaFecha?: string;

  @IsEnum(EstadoVacuna)
  @IsOptional()
  estado?: EstadoVacuna;

  @IsEnum(Urgencia)
  @IsOptional()
  urgencia?: Urgencia;

  @IsNumber()
  @IsOptional()
  peso?: number;

  @IsNumber()
  @IsOptional()
  temperatura?: number;

  @IsString()
  @IsOptional()
  medicamentos?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsInt()
  @IsOptional()
  veterinarioId?: number;
}
