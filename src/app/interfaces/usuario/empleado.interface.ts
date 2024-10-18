import { Reserva } from "../reserva/reserva.interface";
import { Roles } from "./roles.interface";


export interface Empleado {
  dni: String;
  nombres: String;
  apellidos: String;
  direccion: String;
  correoElectronico: String;
  usuario: String;
  clave: String;
  roles: Roles;
  reservas: Reserva;
}

