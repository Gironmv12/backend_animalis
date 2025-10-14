import { Module } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { HistorialMedicoController } from './historial-medico.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ExpedientesService],
  controllers: [ExpedientesController, HistorialMedicoController],
})
export class ExpedientesModule {}
