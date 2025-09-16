export enum GeneroMascota {
  macho = 'macho',
  hembra = 'hembra',
}

export enum EstadoMascota {
  saludable = 'saludable',
  en_tratamiento = 'en_tratamiento',
  vacunacion = 'vacunacion',
}
export class MascotaResponseDto {
  idMascota: number;
  nombre: string;
  especie: string;
  raza: string;
  genero: GeneroMascota;
  fechaNacimiento?: Date;
  propietarioId: number;
  estado?: EstadoMascota;
  color?: string;
  microchip?: string;
  peso?: number;
  notas?: string;
  foto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
