import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../../interfaces/usuario/empleado.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:8080/api/empleado';

  constructor(private http: HttpClient) {}

  // CREAR EMPLEADO
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/crear`, empleado);
  }

  // ACTUALIZAR EMPLEADO
  actualizarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/actualizar/${id}`, empleado);
  }

  // ELIMINAR EMPLEADO
  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR EMPLEADO
  getEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}/listaEmpleado`);
  }
}
