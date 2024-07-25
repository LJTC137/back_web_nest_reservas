/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { MesaEntity } from './mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaService {
  constructor(
    @InjectRepository(MesaEntity)
    private readonly mesaRepository: Repository<MesaEntity>,
  ) {}

  async getMesaList(): Promise<MesaEntity[]> {
    const mesas = await this.mesaRepository.find();
    if (!mesas.length) {
      throw new NotFoundException('No existe un listado de mesas');
    }
    return mesas;
  }

  async createMesa(createMesaDto: CreateMesaDto): Promise<MesaEntity> {
    const { numero_de_mesa } = createMesaDto;
    const exists = await this.mesaRepository.findOne({
      where: { numero_de_mesa },
    });
    if (exists) {
      throw new MessageDto('Mesa ya registrada');
    }

    const mesa = this.mesaRepository.create(createMesaDto);
    return this.mesaRepository.save(mesa);
  }

  async getMesaById(id_mesa: number) {
    return await this.mesaRepository.findOne({
      where: {
        id_mesa,
      },
    });
  }

  async deleteMesa(id_mesa: number) {
    return this.mesaRepository.delete({ id_mesa });
  }

  async updateMesa(id_mesa: number, mesa: UpdateMesaDto) {
    this.mesaRepository.update({ id_mesa }, mesa);
  }
}
