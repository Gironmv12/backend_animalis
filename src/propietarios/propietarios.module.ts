import { Module } from '@nestjs/common';
import { PropietariosService } from './propietarios.service';
import { PropietariosController } from './propietarios.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Usar ruta relativa

@Module({
  imports: [PrismaModule],
  providers: [PropietariosService],
  controllers: [PropietariosController],
})
export class PropietariosModule {}
