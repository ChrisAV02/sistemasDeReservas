import { Caja } from "../pago/caja.interface";
import { Reserva } from "../reserva/reserva.interface";



export interface Cliente {
  idCliente?: number;
  dni:String;
  nombres:String;
  apellidos:String;
  correoElectronico:String;
  celular:String;
  reserevas: Reserva[];
  cajas: Caja;
}

