import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listReservaComponent } from './recepcionista/listReserva/listReserva.component';
import { LoginComponent } from './general/login/login.component';
import { ReservasComponent } from './recepcionista/reservas/reservas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    listReservaComponent,
    LoginComponent,
    ReservasComponent
  ],
  exports:[
    listReservaComponent,
    LoginComponent,
    ReservasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
