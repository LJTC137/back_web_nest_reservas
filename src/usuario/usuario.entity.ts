/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { ReservaEntity } from 'src/reserva/reserva.entity';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'character varying', length: 100, nullable: false })
  nombres: string;

  @Column({ type: 'character varying', length: 100, nullable: false })
  apellidos: string;

  @Column({ type: 'character varying', nullable: false })
  contrasenia: string;

  @Column({ type: 'character varying', nullable: false })
  correo: string;

  @Column({ type: 'character varying', nullable: false, unique: true })
  identificacion: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  estado: boolean;

  @Column({ type: 'double precision', default: 100.0, nullable: false })
  saldo: number;

  @ManyToMany(() => TipoUsuarioEntity, (rol) => rol.tipo_usuario, {
    eager: true,
  })
  @JoinTable({
    name: 'usuario_tipo',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  tipo_usuarioId: TipoUsuarioEntity[];

  @OneToMany(() => ReservaEntity, (reserva) => reserva.usuario)
  reserva: ReservaEntity[];

  @BeforeInsert()
  async hashPasword() {
    if (!this.contrasenia) return;
    this.contrasenia = await hash(this.contrasenia, 12);
  }
}
