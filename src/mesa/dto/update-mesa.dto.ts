/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsBoolean, IsNumber, IsEnum } from 'class-validator';

export class UpdateMesaDto {
  @IsNotEmpty({ message: 'El campo cantidad_personas no puede estar vacío' })
  @IsNumber({}, { message: 'El campo cantidad_personas debe ser un número' })
  cantidad_personas?: number;

  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  @IsBoolean({ message: 'El campo estado debe ser un valor booleano' })
  estado?: boolean;

  @IsNotEmpty({ message: 'El campo planta no puede estar vacío' })
  @IsEnum([1, 2, 3], { message: 'El campo planta debe ser 1, 2 o 3' })
  planta?: number;

  @IsNotEmpty({ message: 'El campo esVip no puede estar vacío' })
  @IsBoolean({ message: 'El campo esVip debe ser un valor booleano' })
  esVip?: boolean;
}
