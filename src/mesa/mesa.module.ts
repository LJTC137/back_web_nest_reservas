/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaEntity } from './mesa.entity';
import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';

@Module({
  imports: [TypeOrmModule.forFeature([MesaEntity])],
  controllers: [MesaController],
  providers: [MesaService],
  exports: [MesaService],
})
export class MesaModule {}
