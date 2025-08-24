import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(8)
  contrasena: string;

  @IsString()
  @IsIn(['administrador', 'asistente', 'veterinario'], {
    message: 'El rol debe ser uno de: administrador, asistente, veterinario',
  })
  rol: string;
}
