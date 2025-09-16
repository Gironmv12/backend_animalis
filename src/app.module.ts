import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropietariosModule } from './propietarios/propietarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { MascostasController } from './mascotas/mascotas.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PropietariosModule,
    MascotasModule,
  ],
  controllers: [AppController, MascostasController],
  providers: [AppService],
})
export class AppModule {}
