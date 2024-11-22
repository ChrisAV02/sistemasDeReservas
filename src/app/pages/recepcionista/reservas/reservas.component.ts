import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion } from '../../../interfaces/habitacion/habitacion.interface';
import { HabitacionService } from '../../../service/habitaciones/habitacion.service';
import { Cliente } from '../../../interfaces/usuario/cliente.interface';
import { ClienteService } from '../../../service/usuarios/cliente.service';
import { ReservaService } from '../../../service/reservas/reserva.service';
import { Reserva } from '../../../interfaces/reserva/reserva.interface';

@Component({
  selector: 'app-pages-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {

  public freeRoom: Habitacion[] = [];
  public clienteEncontrado: Cliente | null = null;
  public dniCliente: string = '';
  public reservaForm: FormGroup;
  public idEmpleado: number = 1;

  constructor(
    private habitacionService: HabitacionService,
    private clienteService: ClienteService,
    private reservaService: ReservaService,
    private fb: FormBuilder
  ) {
    this.reservaForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      roomNumber: [0, Validators.required],
      roomType: ['', Validators.required],
      state: [0, Validators.required],
      finalNight: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerHabitaciones();

    this.reservaForm.get('startDate')?.valueChanges.subscribe(() => {
      this.actualizarPrecioFinal();
    });

    this.reservaForm.get('endDate')?.valueChanges.subscribe(() => {
      this.actualizarPrecioFinal();
    });
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getListaHabitaciones().subscribe(
      (habitacion) => {
        this.freeRoom = habitacion;
        console.log("Lista de habitaciones obtenida", this.freeRoom);
      },
      (error) => {
        console.error('Error al obtener las habitaciones', error);
      }
    )
  }

  seleccionarHabitacion(room: any) {
    this.reservaForm.patchValue({
      roomNumber: room.nHabitacion,
      roomType: room.tipoHabitacion.tipoHabitacion,
      priceNight: room.tipoHabitacion.precio,
      finalNight: this.calcularPrecioTotal(room.tipoHabitacion.precio, this.reservaForm.value.startDate, this.reservaForm.value.endDate)
    });
  }

  calcularPrecioTotal(precioPorNoche: number, fechaInicio: string, fechaFin: string): number {
    if (!fechaInicio || !fechaFin) {
      return 0;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diasEstancia = (fin.getTime() - inicio.getTime()) / (1000 * 3600 * 24);

    return diasEstancia * precioPorNoche;
  }

  actualizarPrecioFinal() {
    const { priceNight, startDate, endDate } = this.reservaForm.value;
    this.reservaForm.patchValue({
      finalNight: this.calcularPrecioTotal(priceNight, startDate, endDate)
    });
  }

  buscarCliente(): void {
    this.clienteService.getClienteByDni(this.dniCliente).subscribe(
      (cliente) => {
        this.clienteEncontrado = cliente;
        console.log('Cliente encontrado:', cliente);

        this.reservaForm.patchValue({
          firstName: cliente.nombres,
          lastName: cliente.apellidos,
          phone: cliente.celular,
          email: cliente.correoElectronico
        });

      },
      (error) => {
        console.warn('Cliente no encontrado, proceder con datos manuales', error);
        this.clienteEncontrado = null;
      }
    );
    console.log('Cliente - > ', this.dniCliente);
  }

  registrarReserva(): void {
    if (this.reservaForm.valid) {
      const nuevoCliente: Cliente = this.clienteEncontrado || {
        dni: this.dniCliente,
        nombres: this.reservaForm.value.firstName,
        apellidos: this.reservaForm.value.lastName,
        celular: this.reservaForm.value.phone,
        correoElectronico: this.reservaForm.value.email,
      };

      this.clienteService.crearCliente(nuevoCliente).subscribe(
        (clienteRegistrado) => {
          this.crearReserva(clienteRegistrado.idCliente!);
        },
        (error) => {
          console.error('Error al registrar el cliente:', error);
        }
      );
    } else {
      console.warn('Formulario no válido');
    }
  }

  crearReserva(clienteId: number): void {
    const formularioReserva = this.reservaForm.value;

    const nuevaReserva: Reserva = {
      fechaRegistro: new Date(),
      fechaInicio: formularioReserva.startDate,
      fechaFin: formularioReserva.endDate,
      estado: formularioReserva.state,
      precioFinal: formularioReserva.finalNight,
      habitacion: {
        nHabitacion: formularioReserva.roomNumber,
        estado: 'ocupado',
        tipoHabitacion: formularioReserva.roomType,
      },
      cliente: {
        dni: this.dniCliente,
        nombres: formularioReserva.firstName,
        apellidos: formularioReserva.lastName,
        celular: formularioReserva.phone,
        correoElectronico: formularioReserva.email
      },
    };

    this.reservaService.crearReserva(nuevaReserva).subscribe(
      (reserva) => {
        console.log('Reserva creada exitosamente:', reserva);
      },
      (error) => {
        console.error('Error al crear la reserva:', error);
      }
    );
  }
}
