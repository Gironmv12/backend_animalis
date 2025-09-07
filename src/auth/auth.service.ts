import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  // register (solo admin)
  async register(dto: RegisterDto, currentUser: any) {
    if (currentUser.rol !== 'administrador') {
      throw new ForbiddenException(
        'Acción no permitida, solo el administrador puede'
      );
    }

    const hash = await bcrypt.hash(dto.contrasena, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellidos: dto.apellido,
        correo: dto.correo,
        contrasena: hash,
        rol: dto.rol as Rol,
      },
    });

    return {
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: usuario.idUsuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }

  // Login
  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        correo: dto.correo,
      },
    });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.contrasena, usuario.contrasena);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    return this.getTokens(usuario.idUsuario, usuario.correo, usuario.rol);
  }

  // REFRESCAR TOKEN
  async refresh(usuario: any) {
    return this.getTokens(usuario.idUsuario, usuario.correo, usuario.rol);
  }

  // generación de tokens
  private async getTokens(
    idUsuario: number,
    correo: string | null,
    rol: string | null
  ) {
    if (!correo || !rol) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { sub: idUsuario, correo, rol }; // se usa 'correo' en lugar de 'email'
    const accessToken = await this.jwt.signAsync(payload, { expiresIn: '15m' });
    const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }
}
