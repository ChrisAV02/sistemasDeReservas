import { tipoHabitacion } from "./tipoHabitacion.interface";


export interface Habitacion {
  idHabitacion?: number;
  idTipo?: number;

  estado: String;
  nHabitacion: number;

  tipoHabitacion?: tipoHabitacion;
}
