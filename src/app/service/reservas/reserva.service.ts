
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../interfaces/reserva/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/api/reserva';

  constructor(private http: HttpClient) {}

  // CREAR RESERVA
  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/crear`, reserva);
  }

  // ACTUALIZAR RESERVA
  actualizarReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/actualizar/${id}`, reserva);
  }

  // ELIMINAR RESERVA
  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR RESERVAS
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/listaReservas`);
  }

    // // Buscar reserva por ID
  // getReservaById(id: number): Observable<Reserva> {
  //   return this.http.get<Reserva>(`${this.apiUrl}/buscar/${id}`);
  // }

}
