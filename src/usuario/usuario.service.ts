/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { MessageDto } from 'src/common/message.dto';
import { RolEnum } from 'src/tipo_usuario/rol.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getUsuariosList(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('No existe un listado de usuarios'),
      );
    return usuarios;
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<any> {
    const { identificacion, correo } = usuario;
    const exists = await this.usuarioRepository.findOne({
      where: [{ identificacion: identificacion }, { correo: correo }],
    });
    if (exists)
      throw new BadRequestException(new MessageDto('Usuario ya registrado'));
    const rolAdmin = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: RolEnum.ADMIN },
    });
    const rolUser = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: RolEnum.USER },
    });
    if (!rolAdmin || !rolUser)
      throw new InternalServerErrorException(
        new MessageDto('los roles aún no han sido creados'),
      );
    const admin = this.usuarioRepository.create(usuario);
    admin.tipo_usuarioId = [rolAdmin, rolUser];
    await this.usuarioRepository.save(admin);
    return new MessageDto('Admin creado');
  }

  async getUsuarioById(id_usuario: number) {
    return await this.usuarioRepository.findOne({
      where: {
        id_usuario,
      },
    });
  }

  async deleteUsuario(id_usuario: number) {
    return this.usuarioRepository.delete({ id_usuario });
  }

  async updateUsuario(id_usuario: number, usuario: UpdateUsuarioDto) {
    const { tipo_usuarioId, ...updateData } = usuario;
    console.log(id_usuario, updateData);

    // await this.authRepository.update(id, updateData);
  }
}
