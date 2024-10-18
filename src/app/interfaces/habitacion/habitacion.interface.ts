import { Reserva } from "../reserva/reserva.interface";
import { tipoHabitacion } from "./tipoHabitacion.interface";


export interface Habitacion {
  estado: String;
  nHabitacion: Number;
  tipoHabitacion: tipoHabitacion;
  reservas: Reserva;
}
