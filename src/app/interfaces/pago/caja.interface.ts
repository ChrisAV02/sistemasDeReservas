import { Reserva } from "../reserva/reserva.interface";
import { Cliente } from "../usuario/cliente.interface";
import { estadoPago } from "./estadoPago.interface";
import { metodoPago } from "./metodoPago.interface";


export interface Caja {
  idCaja?: number;
  idEstado?: number;
  idMetodo?: number;
  idReserva?: number;
  idCliente?: number;

  nOperacion: number;
  fechaPago: Date;
  montoPago: number;

  reserva?: Reserva;
  cliente?: Cliente;
  estadoPago?: estadoPago;
  metodoPago?: metodoPago;
}

