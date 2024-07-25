/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { MesaEntity } from 'src/mesa/mesa.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

export class CreateReservaDto {
  @IsNotEmpty({ message: 'El campo fecha_reserva no puede estar vacío' })
  fecha_reserva: Date;

  fecha_registro_reserva: Date;

  @IsNotEmpty({ message: 'El nombre de la persona de la reservacion no puede estar vacío' })
  nombre_reservacion: string;

  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado: boolean;

  @IsNotEmpty()
  @IsNumber()
  costo_reserva: number;

  @IsNotEmpty()
  @IsNumber()
  costo_total: number;

  usuario: UsuarioEntity;

  mesa: MesaEntity;
}
