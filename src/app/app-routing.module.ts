import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './pages/recepcionista/caja/caja.component';
import { InicioComponent } from './pages/admin/inicio/inicio.component';
import { listReservaComponent } from './pages/recepcionista/listReserva/listReserva.component';
import { PerfilComponent } from './pages/admin/perfil/perfil.component';
import { ReservasComponent } from './pages/recepcionista/reservas/reservas.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component'),
    children: [
      {
        path: 'inicio', component: InicioComponent
      },
      {
        path: 'reservas', component: ReservasComponent
      },
      {
        path: 'caja', component: CajaComponent
      },
      {
        path: 'lista-de-reservas', component: listReservaComponent
      },
      {
        path: 'perfil', component: PerfilComponent
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
