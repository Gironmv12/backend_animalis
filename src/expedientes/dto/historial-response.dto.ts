import { EstadoVacuna, TipoRegistro, Urgencia } from '@prisma/client';

export class HistorialResponseDto {
  idHistorial: number;
  mascotaId?: number;
  tipoRegistro?: TipoRegistro;
  titulo?: string;
  descripcion?: string;
  fechaAplicacion?: string;
  proximaFecha?: string | null;
  estado?: EstadoVacuna | null;
  urgencia?: Urgencia | null;
  peso?: number | null;
  temperatura?: number | null;
  medicamentos?: string | null;
  notas?: string | null;
  veterinarioId?: number | null;
}
