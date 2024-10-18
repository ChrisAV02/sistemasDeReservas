
import { Habitacion } from "../habitacion/habitacion.interface";
import { Caja } from "../pago/caja.interface";
import { Cliente } from "../usuario/cliente.interface";
import { Empleado } from "../usuario/empleado.interface";

export interface Reserva {
  idReserva?: Number;
  fechaRegistro: Date;
  fechaInicio: Date;
  fechaFin: Date;
  precioEstablecido: Number;
  habitacion: Habitacion;
  cliente: Cliente;
  empleado: Empleado;
  caja?: Caja;
}

