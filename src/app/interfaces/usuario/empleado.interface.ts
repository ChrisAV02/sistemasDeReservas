import { Roles } from "./roles.interface";

export interface Empleado {
  idEmpleado?: number;
  rol: [
    {
      idRol: number;
      nombreRol: String;
    }
  ];

  dni: String;
  nombres: String;
  apellidos: String;
  direccion: String;
  correoElectronico: String;
  usuario: String;
  clave: String;

  roles?: Roles;
}
