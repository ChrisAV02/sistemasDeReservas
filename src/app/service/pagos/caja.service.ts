import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caja } from '../../interfaces/pago/caja.interface';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = 'http://localhost:8080/api/habitacion';

  constructor(private http: HttpClient) { }

  //CREAR CAJA
  crearCaja(caja: Caja): Observable<Caja> {
    return this.http.post<Caja>(`${this.apiUrl}/crear`, caja)
  }

  // ACTUALIZAR CAJA
  actualizarCaja(id: number, caja: Caja): Observable<Caja> {
    return this.http.put<Caja>(`${this.apiUrl}/actualizar/${id}`, caja);
  }

  // ELIMINAR CAJA
  eliminarCaja(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR CAJA
  getCaja(): Observable<Caja[]> {
    return this.http.get<Caja[]>(`${this.apiUrl}/listaCAJA`);
  }
}
