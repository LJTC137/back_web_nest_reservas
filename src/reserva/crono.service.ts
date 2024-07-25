/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReservaService } from './reserva.service';
import { MesaService } from 'src/mesa/mesa.service';

@Injectable()
export class CronoService {
  constructor(
    private reservaService: ReservaService,
    private mesaService: MesaService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async manejarReservas() {
    const reservas = await this.reservaService.getReservaList();
    console.log('Ejecuta crono');
    for (const reserva of reservas) {
      try {
        if (
          new Date(reserva.fecha_reserva) < new Date() &&
          reserva.estado === true
        ) {
          reserva.estado = false;
          const mesa = await this.mesaService.getMesaById(reserva.mesa.id_mesa);
          mesa.estado = true
          await this.mesaService.updateMesa(mesa.id_mesa, mesa);
          await this.reservaService.updateReserva(reserva.id_reserva, reserva);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
