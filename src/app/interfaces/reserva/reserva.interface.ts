
import { Habitacion } from "../habitacion/habitacion.interface";
import { Caja } from "../pago/caja.interface";
import { Cliente } from '../usuario/cliente.interface';
import { Empleado } from "../usuario/empleado.interface";

export interface Reserva {
  idReserva?: number;
  idHabitacion?: number;
  idCliente?: number;
  idEmpleado?: number;

  fechaRegistro: Date;
  fechaInicio: Date;
  fechaFin: Date;
  estado: String;
  precioFinal: number
  // RELACIONES A OTRAS TABLAS
  habitacion?: Habitacion;
  cliente?: Cliente;
  empleado?: Empleado;
  caja?: Caja
}

