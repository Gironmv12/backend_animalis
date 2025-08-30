import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Rol, EstadoUsuario } from '@prisma';

export class UpdateUserDto {
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
  @MinLength(8)
  @IsOptional()
  contrasena?: string;

  @IsEnum(Rol)
  @IsOptional()
  rol?: Rol;

  @IsEnum(EstadoUsuario)
  @IsOptional()
  estado?: EstadoUsuario;
}
