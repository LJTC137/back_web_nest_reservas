/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NuevoUsuarioDto } from './dto/new-usuario.dto';
import { LoginUsuarioDto } from './dto/login.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() login: LoginUsuarioDto) {
    return this.authService.login(login);
  }

  @Post('nuevo')
  @UsePipes(new ValidationPipe())
  createUsuario(@Body() nuevaUsuario: NuevoUsuarioDto) {
    return this.authService.createUsuario(nuevaUsuario);
  }

  @Get()
  getUsuarioList() {
    return this.authService.getUsuariosList();
  }

  @Get(':id_usuario')
  getUsuarioById(@Param('id_usuario') id: number) {
    return this.authService.getUsuarioById(id);
  }

  @Patch(':id_usuario')
  updateUsuario(
    @Param('id_usuario') id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.authService.updateUsuario(id, usuario);
  }

  @Delete(':id_usuario')
  deleteUsuario(@Param('id_usuario') id: number) {
    return this.authService.deleteUsuario(id);
  }
}
