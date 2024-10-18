import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion } from '../../interfaces/habitacion/habitacion.interface';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private apiUrl = 'http://localhost:8080/api/habitacion';

  constructor(private http: HttpClient) { }

  //CREAR HABITACION
  crearHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(`${this.apiUrl}/crear`, habitacion)
  }

  // ACTUALIZAR A UN HABITACION
  actualizarHabitacion(id: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/actualizar/${id}`, habitacion);
  }

  // ELIMINAR A UN HABITACION
  eliminarHabitacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR HABITACIONES
  getHabitacion(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(`${this.apiUrl}/listaHabitaciones`);
  }
}
