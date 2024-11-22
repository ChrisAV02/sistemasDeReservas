import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { CajaComponent } from './pages/recepcionista/caja/caja.component';
import { InicioComponent } from './pages/general/inicio/inicio.component';
import { listReservaComponent } from './pages/general/listReserva/listReserva.component';
import { PerfilComponent } from './pages/general/perfil/perfil.component';
import { ReservasComponent } from './pages/recepcionista/reservas/reservas.component';
import { LoginComponent } from './pages/general/login/login.component';
import { DatosEmpresarialComponent } from './pages/admin/datos-empresarial/datos-empresarial.component';
import { GestionEmpleadosComponent } from './pages/admin/gestion-empleados/gestion-empleados.component';
import { GestionHabitacionesComponent } from './pages/admin/gestion-habitaciones/gestion-habitaciones.component';
import { ListaDeClientesComponent } from './pages/admin/lista-de-clientes/lista-de-clientes.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component'),
    children: [
      {
        // canActivate: [AuthGuard]
        path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RECEPCIONISTA'] }
      },
      {
        path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard], data: { roles: ['RECEPCIONISTA'] }
      },
      {
        path: 'caja', component: CajaComponent, canActivate: [AuthGuard], data: { roles: ['RECEPCIONISTA'] }
      },
      {
        path: 'lista-de-reservas', component: listReservaComponent, canActivate: [AuthGuard], data: {  roles: ['ADMIN', 'RECEPCIONISTA'] }
      },
      {
        path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RECEPCIONISTA'] }
      },
      {
        path: 'datos-empresarial', component: DatosEmpresarialComponent, canActivate:[AuthGuard], data: {roles: ['ADMIN']}
      },
      {
        path: 'gestion-empleados', component: GestionEmpleadosComponent, canActivate:[AuthGuard], data: {roles: ['ADMIN']}
      },
      {
        path: 'gestion-habitaciones', component: GestionHabitacionesComponent, canActivate:[AuthGuard], data: {roles: ['ADMIN']}
      },
      {
        path: 'lista-clientes', component: ListaDeClientesComponent, canActivate:[AuthGuard], data: {roles: ['ADMIN']}
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
