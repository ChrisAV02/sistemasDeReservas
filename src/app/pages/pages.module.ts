import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { listReservaComponent } from './general/listReserva/listReserva.component';
import { LoginComponent } from './general/login/login.component';
import { ReservasComponent } from './recepcionista/reservas/reservas.component';
import { PerfilComponent } from './general/perfil/perfil.component';
import { ListaDeClientesComponent } from './admin/lista-de-clientes/lista-de-clientes.component';
import { GestionHabitacionesComponent } from './admin/gestion-habitaciones/gestion-habitaciones.component';
import { GestionEmpleadosComponent } from './admin/gestion-empleados/gestion-empleados.component';
import { SharedModule } from '../components/shared/shared.module';


@NgModule({
  declarations: [
    listReservaComponent,
    LoginComponent,
    ReservasComponent,
    PerfilComponent,
    ListaDeClientesComponent,
    GestionEmpleadosComponent,
    GestionHabitacionesComponent
  ],
  exports:[
    listReservaComponent,
    LoginComponent,
    ReservasComponent,
    PerfilComponent,
    GestionEmpleadosComponent,
    GestionHabitacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
