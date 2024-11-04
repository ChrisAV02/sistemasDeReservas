import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../service/login/auth.service';
import { Router } from '@angular/router';
import { Empleado } from '../../../interfaces/usuario/empleado.interface';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    //SE UTILIZA PARA CREAR FORMULARIOS REACTIVOS EN ANGULAR
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (authEmpleado: Empleado | null) => {
          if (authEmpleado) {
            console.log('Inicio de sesión exitoso');
            this.loginError = null;
            console.log(authEmpleado);
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
