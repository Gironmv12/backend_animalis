import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Rol, EstadoUsuario } from '@prisma';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(100)
  apellidos: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(8)
  contrasena: string;

  @IsEnum(Rol)
  rol: Rol;

  @IsEnum(EstadoUsuario)
  estado?: EstadoUsuario;
}
