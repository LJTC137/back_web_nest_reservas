/* eslint-disable prettier/prettier */
import { MesaEntity } from 'src/mesa/mesa.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'reserva' })
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  id_reserva: number;

  @Column({ type: 'date' })
  fecha_reserva: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_registro_reserva: Date;

  @Column({ type: 'character varying' })
  nombre_reservacion: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  estado: boolean;

  @Column({ type: 'double precision', nullable: false, default: 10.0 })
  costo_reserva: number;

  @Column({ type: 'double precision' })
  costo_total: number;

  @ManyToOne(() => UsuarioEntity, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioEntity;

  @ManyToOne(() => MesaEntity, { nullable: false })
  @JoinColumn({ name: 'id_mesa' })
  mesa: MesaEntity;
}
