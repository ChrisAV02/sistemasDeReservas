import { Reserva } from "../reserva/reserva.interface";
import { Cliente } from "../usuario/cliente.interface";
import { estadoPago } from "./estadoPago.interface";
import { metodoPago } from "./metodoPago.interface";


export interface Caja {
  nOperacion: Number;
  fechaPago: Date;
  montoPago: Number;
  estadoPago: estadoPago;
  metodoPago: metodoPago;
  reserva: Reserva;
  cliente: Cliente;
}

