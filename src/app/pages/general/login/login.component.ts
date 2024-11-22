import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/login/auth.service';
import { Router } from '@angular/router';
import { Empleado } from '../../../interfaces/usuario/empleado.interface';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio']); // Redirige si ya está autenticado
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (authEmpleado: Empleado | null) => {
          if (authEmpleado) {
            this.loginError = null;
            localStorage.setItem('authEmpleado', JSON.stringify(authEmpleado)); // Guardar empleado en localStorage
            this.router.navigate(['/inicio']);
          } else {
            this.loginError = 'Credenciales incorrectas';
          }
        },
        error => {
          this.loginError = 'Error al conectar con el servidor';
          console.error('Error en el inicio de sesión:', error);
        }
      );
    }
  }
}
