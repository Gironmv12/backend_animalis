import { IsString, IsInt, IsEnum } from 'class-validator';

export enum GeneroMascota {
  macho = 'macho',
  hembra = 'hembra',
}

export enum EstadoMascota {
  saludable = 'saludable',
  en_tratamiento = 'en_tratamiento',
  vacunacion = 'vacunacion',
}

export class CreateMascotaDto {
  @IsString()
  nombre: string;

  @IsEnum(GeneroMascota)
  genero: GeneroMascota;

  @IsString()
  especie: string;

  @IsString()
  raza: string;

  @IsInt()
  propietarioId: number;

  @IsEnum(EstadoMascota)
  estado: EstadoMascota;
}
