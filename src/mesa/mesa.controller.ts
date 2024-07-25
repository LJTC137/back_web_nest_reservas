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
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { MesaEntity } from './mesa.entity';
import { MesaService } from './mesa.service';

@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Get()
  async getMesaList(): Promise<MesaEntity[]> {
    return this.mesaService.getMesaList();
  }

  @Post()
  async createMesa(@Body() createMesaDto: CreateMesaDto): Promise<MesaEntity> {
    return this.mesaService.createMesa(createMesaDto);
  }

  @Get(':id')
  async getMesaById(@Param('id') id_mesa: number): Promise<MesaEntity> {
    return this.mesaService.getMesaById(id_mesa);
  }

  @Delete(':id_mesa')
  deleteMesa(@Param('id_mesa') id: number) {
    return this.mesaService.deleteMesa(id);
  }

  @Patch(':id_mesa')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateMesa(@Param('id_mesa') id: number, @Body() mesa: UpdateMesaDto) {
    return this.mesaService.updateMesa(id, mesa);
  }
}
