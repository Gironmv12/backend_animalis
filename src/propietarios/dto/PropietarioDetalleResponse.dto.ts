import { PropietarioResponseDto } from './propietarioResponse.dto';
import { PropietarioMascotaResponseDto } from '../propietarioMascotaResponse.dto';

export class PropietarioDetalleResponseDto {
  propietario: PropietarioResponseDto;
  mascotas: PropietarioMascotaResponseDto[];
}
