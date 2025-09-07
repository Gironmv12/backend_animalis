import {
  IsString,
  IsOptional,
  IsEmail,
  MaxLength,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { EstadoUsuario } from '@prisma/client';

export class CreatePropietarioDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(100)
  apellidos: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MaxLength(20)
  telefono: string;

  @IsString()
  @MaxLength(200)
  direccion: string;

  @IsEnum(EstadoUsuario)
  estado: EstadoUsuario;

  @IsString()
  @IsOptional()
  notas: string;

  @IsDateString()
  fechaUltimaVisita: string;
}
