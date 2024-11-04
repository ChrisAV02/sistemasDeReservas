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
  private todasLasReservas: Reserva[] = [];
  public filtro: string = '';

  constructor(
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas(): void {
    this.reservaService.getReservas().subscribe(
      (reservas) => {
        this.listReservas = reservas;
        this.todasLasReservas = reservas;
        // console.log('Lista de reservas obtenida:', this.listReservas);
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  filtrarReservas(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.listReservas = this.todasLasReservas.filter(reserva =>
      reserva.cliente?.nombres.toLowerCase().includes(filtroLowerCase) ||
      reserva.cliente?.dni.toString().includes(filtroLowerCase) ||
      reserva.idReserva?.toString().includes(filtroLowerCase)
    );
  }
}
