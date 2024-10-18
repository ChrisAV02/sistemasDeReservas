import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../service/reservas/reserva.service';
import { Reserva } from '../../../interfaces/reserva/reserva.interface';

@Component({
  selector: 'app-pages-listReservas',
  templateUrl: './listReserva.component.html',
  styleUrl: './listReserva.component.css'
})
export class listReservaComponent implements OnInit {

  public listReservas: Reserva[] = [];
  public filtro: string = '';

  constructor(
    public reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas(): void {
    this.reservaService.getReservas().subscribe(
      (reservas) => {
        this.listReservas = reservas;
        console.log('Lista de reservas obtenida:', this.listReservas);
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  // Método para filtrar reservas por ID, DNI o nombre
  filtrarReservas(): void {
    this.listReservas = this.listReservas.filter(listReservas =>
      listReservas.cliente.nombres.includes(this.filtro) ||
      listReservas.cliente.dni.toString().includes(this.filtro) ||
      listReservas.idReserva?.toString().includes(this.filtro)
    );
  }
}
