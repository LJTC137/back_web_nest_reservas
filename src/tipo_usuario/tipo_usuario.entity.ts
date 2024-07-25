/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { RolEnum } from './rol.enum';

@Entity({ name: 'tipo-usuario' })
export class TipoUsuarioEntity {
  @PrimaryGeneratedColumn()
  id_usuario_rol: number;

  @Column({ type: 'character varying', default: 'cliente' })
  nombre_tipo_usuario: RolEnum;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.tipo_usuarioId)
  tipo_usuario: UsuarioEntity[];
}
