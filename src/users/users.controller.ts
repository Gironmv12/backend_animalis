import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserLoginResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //Obtener todos los usuarios
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }
  //obtener un usuario por id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(Number(id));
  }
  //Crear un usuario
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }
  //Actualizar un usuario
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.usersService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param(':id') id: string): Promise<UserResponseDto> {
    return this.usersService.remove(Number(id));
  }

  @Post('login')
  @HttpCode(201)
  async login(@Body() dto: LoginUserDto): Promise<UserLoginResponseDto> {
    return this.usersService.login(dto);
  }
}
