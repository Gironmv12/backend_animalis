import { Rol, EstadoUsuario } from '@prisma/client';

export class UserResponseDto {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: Rol;
  estado: EstadoUsuario;
  fechaCreacion: Date;
}

export class UserLoginResponseDto {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: Rol;
  estado: EstadoUsuario;
  fechaCreacion: Date;
  token: string;
}
