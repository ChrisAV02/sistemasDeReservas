import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoHabitacion } from '../../interfaces/habitacion/tipoHabitacion.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {

  private apiUrl = 'http://localhost:8080/api/tipoHabitaciones';

  constructor(private http: HttpClient) { }

  //CREAR TIPO DE HABITACION
  crearTipoHabitacion(tipo: tipoHabitacion): Observable<tipoHabitacion> {
    return this.http.post<tipoHabitacion>(`${this.apiUrl}/crear`, tipo)
  }

  // ACTUALIZAR TIPO DE HABITACION
  actualizarTipoHabitacion(id: number, tipo: tipoHabitacion): Observable<tipoHabitacion> {
    return this.http.put<tipoHabitacion>(`${this.apiUrl}/actualizar/${id}`, tipo);
  }

  // ELIMINAR A UN TIPO DE HABITACION
  eliminarTipoHabitacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR TIPO DE HABITACIONES
  getTipoHabitacion(): Observable<tipoHabitacion[]> {
    return this.http.get<tipoHabitacion[]>(`${this.apiUrl}/lista/tipo/habitacion`);
  }
}
