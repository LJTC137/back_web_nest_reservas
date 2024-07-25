/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario.entity';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { TipoUsuarioModule } from 'src/tipo_usuario/tipo_usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TipoUsuarioEntity]),
    TipoUsuarioModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
