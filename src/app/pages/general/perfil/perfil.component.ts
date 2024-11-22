import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/usuario/empleado.interface';
import { AuthService } from '../../../service/login/auth.service';
import { EmpleadoService } from '../../../service/usuarios/empleado.service';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  private empleado: Empleado | null;
  public perfilForm: FormGroup;
  public passwordForm: FormGroup;
  // public passwordError: string | null = null;

  constructor(
    private authService: AuthService,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.empleado = this.authService.getAuthEmpleado();
    this.perfilForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.minLength(8)],
      newPassword: ['', Validators.minLength(8)]
    });

  }

  ngOnInit(): void {
    this.perfilForm.patchValue({
      firstName: this.empleado?.nombres,
      lastName: this.empleado?.apellidos,
      address: this.empleado?.direccion,
      email: this.empleado?.correoElectronico,
      document: this.empleado?.dni,
    });
  }

  onSubmitPerfil(): void {
    if (this.perfilForm.valid) {

      const idEmpleado = this.empleado?.idEmpleado || 0;

      const updatedEmpleado: Empleado = {
        ...this.empleado,
        nombres: this.perfilForm.value.firstName,
        apellidos: this.perfilForm.value.lastName,
        direccion: this.perfilForm.value.address,
        correoElectronico: this.perfilForm.value.email,
        dni: this.perfilForm.value.document,
        usuario: this.perfilForm.value.document
      };

      this.empleadoService.actualizarEmpleado(idEmpleado, updatedEmpleado).subscribe(
        (response) => {
          console.log('Perfil actualizado:', response);
          localStorage.setItem('authEmpleado', JSON.stringify(updatedEmpleado));
          this.empleado = updatedEmpleado;
          alert('Perfil actualizado correctamente');

          this.router.navigate(['/perfil']);
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
          alert('Hubo un error al actualizar el perfil');
        }
      );
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.value.password;
      const newPassword = this.passwordForm.value.newPassword;

      if (password && newPassword && password === newPassword && newPassword.length >= 8) {
        const idEmpleado = this.empleado?.idEmpleado || 0;
        const updatedEmpleado: Empleado = {
          ...this.empleado,
          clave: newPassword ?? '',
          dni: this.empleado?.dni || '',
          nombres: this.empleado?.nombres || '',
          apellidos: this.empleado?.apellidos || '',
          direccion: this.empleado?.direccion || '',
          correoElectronico: this.empleado?.correoElectronico || '',
          usuario: this.empleado?.usuario || ''
        };

        this.empleadoService.actualizarEmpleado(idEmpleado, updatedEmpleado).subscribe(
          (response) => {
            console.log('Contraseña actualizada:', response);
            alert('Contraseña actualizada correctamente');
            this.router.navigate(['/perfil']);
          },
          (error) => {
            console.error('Error al actualizar la contraseña:', error);
            alert('Hubo un error al actualizar la contraseña');
          }
        );
      } else {
        alert('Las contraseñas no coinciden o no cumplen con los requisitos de longitud');
      }
    }
  }

}
