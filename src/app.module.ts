import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropietariosModule } from './propietarios/propietarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { MascostasController } from './mascotas/mascotas.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { ReportesController } from './reportes/reportes.controller';
import { ReportesService } from './reportes/reportes.service';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PropietariosModule,
    MascotasModule,
    NotificationsModule,
    ExpedientesModule,
    ReportesModule,
  ],
  controllers: [AppController, MascostasController, ReportesController],
  providers: [AppService, ReportesService],
})
export class AppModule {}
