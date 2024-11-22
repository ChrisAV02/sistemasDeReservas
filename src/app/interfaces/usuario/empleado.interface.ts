import { Roles } from "./roles.interface";

export interface Empleado {
  idEmpleado?: number;
  rol?: [
    {
      idRol?: number;
      nombreRol?: string;
    }
  ];

  dni: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  correoElectronico: string;
  usuario: string;
  clave?: string;

  roles?: Roles;
}
