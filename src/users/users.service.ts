import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserLoginResponseDto } from './dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private notifications: NotificationsService
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.usuario.findMany();
    return users.map((user) => this.toUserResponse(user));
  }

  async findOne(idUsuario: number): Promise<UserResponseDto> {
    const user = await this.prisma.usuario.findUnique({
      where: { idUsuario: idUsuario },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${idUsuario} not found`);
    }
    return this.toUserResponse(user);
  }

  //crear el usuario
  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const hash = await bcrypt.hash(dto.contrasena, 10);
    const user = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        correo: dto.correo,
        contrasena: hash,
        rol: dto.rol,
        estado: dto.estado ?? 'A',
      },
    });

    // Notificar a n8n (no bloqueante)
    this.notifications.notify(
      'user.created',
      {
        id: user.idUsuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
      'N8N_WEBHOOK_URL_USER_CREATED'
    );

    return this.toUserResponse(user);
  }

  //Actualizar el usuario
  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    await this.findOne(id); // Verificar si el usuario existe
    const data: any = { ...dto };
    if (dto.contrasena) {
      data.contrasena = await bcrypt.hash(dto.contrasena, 10);
    }
    const user = await this.prisma.usuario.update({
      where: { idUsuario: id },
      data: data,
    });
    return this.toUserResponse(user);
  }

  //eliminar un usuario
  async remove(id: number): Promise<UserResponseDto> {
    const user = await this.prisma.usuario.delete({
      where: { idUsuario: id },
    });
    return this.toUserResponse(user);
  }

  //Login
  async login(dto: LoginUserDto): Promise<UserLoginResponseDto> {
    const user = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const isValid = await bcrypt.compare(dto.contrasena, user.contrasena);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.toUserLoginResponse(user);
  }

  private toUserResponse(user: any): UserResponseDto {
    return {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      rol: user.rol,
      estado: user.estado,
      fechaCreacion: user.fechaCreacion,
    };
  }

  private toUserLoginResponse(user: any): UserLoginResponseDto {
    return {
      idUsuario: user.idUsuario,
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      rol: user.rol,
      estado: user.estado,
      fechaCreacion: user.fechaCreacion,
      token: this.generateToken(user),
    };
  }

  private generateToken(user: any): string {
    const payload = { sub: user.idUsuario, correo: user.correo, rol: user.rol };
    return this.jwt.sign(payload);
  }
}
