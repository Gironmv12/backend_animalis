import { EstadoUsuario } from '@prisma';

export class PropietarioResponseDto {
  id: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  direccion: string;
  estado: EstadoUsuario;
  notas: string;
  fechaUltimaVisita: string;
}
