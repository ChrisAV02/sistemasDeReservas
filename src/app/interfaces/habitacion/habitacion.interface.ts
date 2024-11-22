import { tipoHabitacion } from "./tipoHabitacion.interface";


export interface Habitacion {
  idHabitacion?: number;
  idTipo?: number;

  estado: string;
  nHabitacion: number;

  tipoHabitacion?: tipoHabitacion;
}
