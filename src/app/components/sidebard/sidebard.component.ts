import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/login/auth.service';
import { Empleado } from '../../interfaces/usuario/empleado.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-components-sidebard',
  standalone: true,
  imports:[RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebard.component.html',
  styleUrl: './sidebard.component.css'
})
export class SidebardComponent implements OnInit{

  private empleado: Empleado | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.empleado = this.authService.getAuthEmpleado();
  }

  logout(): void {
    this.authService.logout();
  }

  hasRole(roleName: string): boolean {
    const nombreRol: string[] = this.getUserRoles();
    return nombreRol.includes(roleName);
  }

  getUserRoles(): string[] {
    return this.empleado?.rol?.map(role => role.nombreRol).filter((nombreRol): nombreRol is string => !!nombreRol) || [];
  }
}
