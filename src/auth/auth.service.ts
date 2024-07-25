/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { NuevoUsuarioDto } from './dto/new-usuario.dto';
import { RolEnum } from 'src/tipo_usuario/rol.enum';
import { LoginUsuarioDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly authRepository: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsuariosList(): Promise<UsuarioEntity[]> {
    const usuarios = await this.authRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('No existe un listado de usuarios'),
      );
    return usuarios;
  }

  async createUsuario(usuario: NuevoUsuarioDto): Promise<any> {
    const { identificacion, correo } = usuario;
    const exists = await this.authRepository.findOne({
      where: [{ identificacion: identificacion }, { correo: correo }],
    });
    if (exists)
      throw new BadRequestException(new MessageDto('Usuario ya registrado'));
    const rolUser = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: RolEnum.USER },
    });
    if (!rolUser)
      throw new InternalServerErrorException(
        new MessageDto('Los roles aún no han sido creados'),
      );
    const user = this.authRepository.create(usuario);
    user.tipo_usuarioId = [rolUser];
    await this.authRepository.save(user);
    return new MessageDto('Cliente creado');
  }

  async login(dto: LoginUsuarioDto): Promise<any> {
    const { correo, identificacion } = dto;
    const usuario = await this.authRepository.findOne({
      where: [{ correo: correo }, { identificacion: identificacion }],
    });
    if (!usuario)
      return new UnauthorizedException(new MessageDto('Usuario no existente'));
    const contraseniaOk = await compare(dto.contrasenia, usuario.contrasenia);
    if (!contraseniaOk)
      return new UnauthorizedException(new MessageDto('Contrasenia erronea'));
    const payload: PayloadInterface = {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      identificacion: usuario.identificacion,
      roles: usuario.tipo_usuarioId.map(
        (tipo_usuario) => tipo_usuario.nombre_tipo_usuario as RolEnum,
      ),
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async getUsuarioById(id_usuario: number) {
    return await this.authRepository.findOne({
      where: {
        id_usuario,
      },
    });
  }

  async deleteUsuario(id_usuario: number) {
    return this.authRepository.delete({ id_usuario });
  }

  async updateUsuario(id_usuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { tipo_usuarioId, ...updateData } = updateUsuarioDto;
    await this.authRepository.update(id_usuario, updateData);
  }
}
