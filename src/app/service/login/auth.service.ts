import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Empleado } from '../../interfaces/usuario/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private authUrl = 'http://localhost:8080/api/auth/login';
  private empleado: Empleado | null = null;

  //ESTOY INSTANCIANDO DOS PROPIEDADES PRIVADAS DE HttpCliente y Router QUE SON SERVICIOS DE ANGULAR
  constructor(private http: HttpClient, private router: Router) {
    // Obtiene el estado de loggedIn desde localStorage al iniciar el servicio
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  login(credentials: { usuario: string, clave: string }): Observable<Empleado | null> {
    return this.http.post<Empleado | null>(this.authUrl, credentials).pipe(
      map(authEmpleado => {
        if (authEmpleado) {
          // Credenciales correctas, puedes hacer algo como almacenar el token si tu backend lo proporciona
          this.loggedIn = true;
          localStorage.setItem('loggedIn', 'true');

          // Guarda los roles como un arreglo de ids de roles en localStorage
          const roleNames = authEmpleado.rol.map(role => role.nombreRol);
          localStorage.setItem('userRoles', JSON.stringify(roleNames));
          this.empleado = authEmpleado;
          return authEmpleado;
        } else {
          this.loggedIn = false;
          localStorage.setItem('loggedIn', 'false');
          localStorage.removeItem('userRoles');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        this.loggedIn = false;
        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('userRoles');
        return of(null); // En caso de error, también retornamos null
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('userRoles');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  getEmpleado(): Empleado | null {
    return this.empleado;
  }
}
