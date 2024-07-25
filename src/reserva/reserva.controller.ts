/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ReservaEntity } from './reserva.entity';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Get()
  async getReservaList(): Promise<ReservaEntity[]> {
    return this.reservaService.getReservaList();
  }

  @Get(':id')
  async getReservaById(
    @Param('id') id_reserva: number,
  ): Promise<ReservaEntity> {
    return this.reservaService.getReservaById(id_reserva);
  }

  @Get('user/:id_usuario')
  async getReservaUserById(
    @Param('id_usuario') id_reserva: number,
  ) {
    return this.reservaService.getReservaUserList(id_reserva);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createReserva(
    @Body() nuevaReserva: CreateReservaDto,
  ): Promise<any> {
    return this.reservaService.createReserva(nuevaReserva);
  }

  @Delete(':id_reserva')
  deleteReserva(@Param('id_reserva') id: number) {
    return this.reservaService.deleteReserva(id);
  }

  @Patch(':id_reserva')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateReserva(
    @Param('id_reserva') id: number,
    @Body() reserva: UpdateReservaDto,
  ) {
    return this.reservaService.updateReserva(id, reserva);
  }
}
