import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/login/auth.service';
import { Empleado } from '../interfaces/usuario/empleado.interface';


@Injectable({
  providedIn: 'root'
})
//CanActivate nos sirve para proteger rutas
export class AuthGuard implements CanActivate {

  private empleado: Empleado | null;

  //INSTANCIANDO UNA PROPIEDAD PRIVADA
  constructor(private authService: AuthService, private router: Router) {
    this.empleado = this.authService.getAuthEmpleado();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const userRoles = this.empleado?.rol?.map(role => role.nombreRol);
      const requiredRoles = route.data['roles'] as string[];

      // Verifica si el usuario tiene al menos uno de los roles requeridos
      if (requiredRoles.some(role => userRoles?.includes(role))) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
