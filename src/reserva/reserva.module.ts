/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './reserva.entity';
import { ReservaController } from './reserva.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CronoService } from './crono.service';
import { MesaModule } from 'src/mesa/mesa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaEntity, UsuarioEntity, MesaEntity]),
    UsuarioModule,
    MesaModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService, CronoService],
  exports: [ReservaService],
})
export class ReservaModule {}
