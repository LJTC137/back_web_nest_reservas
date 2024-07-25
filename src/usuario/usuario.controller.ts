/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUsuario(@Body() nuevaUsuario: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(nuevaUsuario);
  }

  @Get(':id_usuario')
  getUsuarioById(@Param('id_usuario') id: number): Promise<UsuarioEntity> {
    return this.usuarioService.getUsuarioById(id);
  }

  @Get()
  getUsuarioList() {
    return this.usuarioService.getUsuariosList();
  }

  @Delete(':id_usuario')
  deleteUsuario(@Param('id_usuario') id: number) {
    return this.usuarioService.deleteUsuario(id);
  }

  @Patch(':id_usuario')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  updateUsuario(
    @Param('id_usuario') id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updateUsuario(id, usuario);
  }
}
