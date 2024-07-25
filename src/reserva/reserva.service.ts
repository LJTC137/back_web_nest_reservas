/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservaEntity } from './reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { MessageDto } from 'src/common/message.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { MesaEntity } from 'src/mesa/mesa.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly reservaRepository: Repository<ReservaEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(MesaEntity)
    private readonly mesaRepository: Repository<MesaEntity>,
  ) {}

  async getReservaList(): Promise<ReservaEntity[]> {
    const reservas = await this.reservaRepository.find({
      relations: ['usuario', 'mesa'],
    });
    if (!reservas.length) {
      throw new NotFoundException('No existe un listado de reservas');
    }
    return reservas;
  }

  async getReservaUserList(id_usuario): Promise<ReservaEntity[]> {
    const reservas = await this.reservaRepository.find({
      where: {
        usuario: {
          id_usuario: id_usuario,
        },
      },
      relations: ['usuario', 'mesa'],
    });
    if (!reservas.length) {
      throw new NotFoundException('No tiene reservas disponibles');
    }
    return reservas;
  }

  async createReserva(reserva: CreateReservaDto): Promise<any> {
    const { costo_total, usuario, mesa } = reserva;

    const user = await this.usuarioRepository.findOne({
      where: { id_usuario: usuario.id_usuario },
    });

    if (!user) {
      throw new BadRequestException(new MessageDto('El usuario no existe'));
    }

    const table = await this.mesaRepository.findOne({
      where: { id_mesa: mesa.id_mesa },
    });

    if (!table) {
      throw new BadRequestException(new MessageDto('La mesa no existe'));
    }

    const existTable = await this.mesaRepository.findOne({
      where: { id_mesa: mesa.id_mesa, estado: false },
    });

    if (existTable) {
      throw new BadRequestException(new MessageDto('Mesa ocupada'));
    }

    if (user.saldo < costo_total) {
      throw new BadRequestException(new MessageDto('Saldo insuficiente'));
    }

    table.estado = false;
    await this.mesaRepository.save(table);

    user.saldo -= costo_total;
    await this.usuarioRepository.save(user);

    const newReserva = this.reservaRepository.create(reserva);
    newReserva.usuario = user;
    newReserva.mesa = table;

    await this.reservaRepository.save(newReserva);

    return new MessageDto('Reserva creada exitosamente');
  }

  async getReservaById(id_reserva: number) {
    return await this.reservaRepository.findOne({
      where: {
        id_reserva,
      },
      relations: ['mesa', 'usuario'],
    });
  }

  async deleteReserva(id_reserva: number) {
    return this.reservaRepository.delete({ id_reserva });
  }

  async updateReserva(id_reserva: number, reserva: UpdateReservaDto) {
    this.reservaRepository.update({ id_reserva }, reserva);
  }
}
