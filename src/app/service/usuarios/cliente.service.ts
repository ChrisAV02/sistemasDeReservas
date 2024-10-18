import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../../interfaces/usuario/cliente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/cliente';

  constructor(private http: HttpClient) { }

  //CREAR CLIENTE
  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/crear`, cliente)
  }

  // ACTUALIZAR A UN CLIENTE
  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/actualizar/${id}`, cliente);
  }

  // ELIMINAR A UN CLIENTE
  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  // LISTAR CLIENTES
  getCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/listaClientes`);
  }

  // BUSCAR CLIENTE POR SU ID
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/buscar/${id}`);
  }

}
