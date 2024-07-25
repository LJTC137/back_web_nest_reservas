/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class UpdateReservaDto {
  @IsNotEmpty({ message: 'El campo fecha_reserva no puede estar vacío' })
  fecha_reserva?: Date;

  @IsNotEmpty({
    message: 'El campo fecha_registro_reserva no puede estar vacío',
  })
  fecha_registro_reserva?: Date;

  nombre_reservacion: string;
  
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado?: boolean;

  @IsNumber()
  costo_reserva: number;

  @IsNumber()
  costo_total: number;

  @IsNotEmpty({ message: 'El campo tipo_usuario no puede estar vacío' })
  @IsNumber({}, { message: 'El campo tipo_usuario debe ser un número' })
  id_usuario?: number;
}
