import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from '../notificacion/notificacion.component';

@NgModule({
  declarations: [
    NotificacionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificacionComponent
  ]
})
export class SharedModule { }
