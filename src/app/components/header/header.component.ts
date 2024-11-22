import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public rol: string = 'a';
  public pageName: string = 'b';

  constructor(private renderer: Renderer2, private router: Router) {
    this.rol = "hola";
    this.router.events.subscribe(() => {
      this.pageName = this.getPageName();
    });
  }

  darkMode(event: any) {
    if (event.target.checked) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  getUserRole(): string {
    const authEmpleado = localStorage.getItem('authEmpleado');
    const empleado = authEmpleado ? JSON.parse(authEmpleado) : null;
    return empleado?.rol || ''; // Suponiendo que `rol` contiene el nombre del rol.
  }

  getPageName(): string {
    const url = this.router.url;
    return url.split('/').pop() || 'Inicio';
  }

}
