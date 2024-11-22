import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../../interfaces/usuario/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) { }

  //CREAR ROL
  crearRoles(rol: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${this.apiUrl}/crear`, rol)
  }

  // ACTUALIZAR ROL
  actualizarRoles(id: number, rol: Roles): Observable<Roles> {
    return this.http.put<Roles>(`${this.apiUrl}/actualizar/${id}`, rol);
  }

  // ELIMINAR ROL
  eliminarRoles(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR ROLES
  getListRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.apiUrl}/listaRoles`);
  }
}
