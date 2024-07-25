/* eslint-disable prettier/prettier */
import { ReservaEntity } from 'src/reserva/reserva.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mesa' })
export class MesaEntity {
  @PrimaryGeneratedColumn()
  id_mesa: number;

  @Column({ type: 'integer', nullable: false })
  cantidad_personas: number;

  @Column({ type: 'integer', nullable: false })
  numero_de_mesa: number;

  @Column({ type: 'boolean', default: true, nullable: false })
  estado: boolean;

  @Column({ type: 'enum', enum: [1, 2, 3], nullable: false })
  planta: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  esVip: boolean;

  @Column({ type: 'double precision', nullable: false })
  costo_mesa: number;

  @OneToMany(() => ReservaEntity, (reserva) => reserva.mesa)
  reserva: ReservaEntity[];
}
