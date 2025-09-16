import { Module } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { MascostasController } from './mascotas.controller';
import { MascotasFilesService } from './mascotas-files.service';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUrl =
  process.env.NODE_ENV === 'desarrollo'
    ? process.env.MONGO_CONEXION_PRODUCCION
    : process.env.MONGO_URL;

@Module({
  imports: [MongooseModule.forRoot(mongoUrl!)],
  providers: [MascotasService, MascotasFilesService],
  controllers: [MascostasController],
  exports: [MascotasService, MascotasFilesService],
})
export class MascotasModule {}
