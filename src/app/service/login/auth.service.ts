import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Empleado } from '../../interfaces/usuario/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/api/auth/login';
  private authEmpleado: Empleado | null = null;

  //ESTOY INSTANCIANDO DOS PROPIEDADES PRIVADAS DE HttpCliente y Router QUE SON SERVICIOS DE ANGULAR
  constructor(private http: HttpClient, private router: Router) {
    // Obtiene el estado de loggedIn desde localStorage al iniciar el servicio
    const empleadoData = localStorage.getItem('authEmpleado');
    this.authEmpleado = empleadoData ? JSON.parse(empleadoData) as Empleado : null;
  }

  login(credentials: { usuario: string, clave: string }): Observable<Empleado | null> {
    return this.http.post<Empleado | null>(this.authUrl, credentials).pipe(
      map(authEmpleado => {
        if (authEmpleado) {
          // Guarda los roles como un arreglo de ids de roles en localStorage
          // const roleNames = authEmpleado.rol.map(role => role.nombreRol);
          // localStorage.setItem('userRoles', JSON.stringify(roleNames));

          // Guardar el empleado autenticado en la propiedad y en localStorage
          this.authEmpleado = authEmpleado;
          localStorage.setItem('authEmpleado', JSON.stringify(authEmpleado));
        } else {
          // Si las credenciales no son válidas, se asegura de que no se guarde nada en localStorage
          this.authEmpleado = null;
          localStorage.removeItem('authEmpleado');
        }
        return authEmpleado;
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        this.authEmpleado = null;
        localStorage.removeItem('authEmpleado');
        return of(null); // En caso de error, también retornamos null
      })
    );
  }

  logout(): void {
    this.authEmpleado = null;
    localStorage.removeItem('authEmpleado');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
        // Comprobar si hay un empleado autenticado en localStorage o en la propiedad local
        return this.authEmpleado !== null || localStorage.getItem('authEmpleado') !== null;
  }

  getAuthEmpleado(): Empleado | null {
    if (!this.authEmpleado) {
      // Recargar desde localStorage si es necesario
      const empleadoData = localStorage.getItem('authEmpleado');
      this.authEmpleado = empleadoData ? JSON.parse(empleadoData) as Empleado : null;
    }
    return this.authEmpleado;
  }

  // getUserRoles(): string[] {
  //   const roles = localStorage.getItem('authEmpleado');
  //   return roles ? JSON.parse(roles) : [];
  // }
}
