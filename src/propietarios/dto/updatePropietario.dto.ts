import {
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { EstadoUsuario } from '@prisma';

export class UpdatePropietarioDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  nombre?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  apellidos?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsEnum(EstadoUsuario)
  @IsOptional()
  estado?: EstadoUsuario;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsDateString()
  @IsOptional()
  fechaUltimaVisita?: string;
}
