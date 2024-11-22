import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../service/usuarios/empleado.service';
import { RolesService } from '../../../service/usuarios/roles.service';
import { Empleado } from '../../../interfaces/usuario/empleado.interface';
import { Roles } from '../../../interfaces/usuario/roles.interface';
import { NotificacionComponent } from '../../../components/notificacion/notificacion.component';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css']
})
export class GestionEmpleadosComponent implements OnInit {

  @ViewChild(NotificacionComponent) notification!: NotificacionComponent;

  public filtro: string = '';
  public listEmpleados: Empleado[] = [];
  private todasLosEmpleados: Empleado[] = [];
  public roles: Roles[] = [];
  public empleadoForm: FormGroup;
  public empleadoEditForm: FormGroup;
  private empleadoId: number | null = null;


  mostrarModalEdit: boolean = false;
  mostrarModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private rolesService: RolesService,
  ) {
    this.empleadoForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      usuario: [{ value: '', disabled: true }, Validators.required],
      clave: ['', Validators.required]
    });

    this.empleadoEditForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      correoElectronico: ['', [Validators.email]],
      rol: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerRoles();
    this.empleadoForm.get('dni')?.valueChanges.subscribe(value => {
      this.empleadoForm.get('usuario')?.setValue(value);
    });
  }

  obtenerEmpleados(): void {
    this.empleadoService.getListEmpleados().subscribe(
      (item) => {
        this.listEmpleados = item;
        this.todasLosEmpleados = item;
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
        this.notification.showMessage(`Error al obtener los empleados:${error}`, 'error', 3000);
      }
    );
  }

  obtenerRoles(): void {
    this.rolesService.getListRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        this.notification.showMessage(`Error al obtener los roles:${error}`, 'error', 3000);
      }
    );
  }

  filtrarEmpleados(): void {
    const filtroLowerCase = this.filtro.toLowerCase();
    this.listEmpleados = this.todasLosEmpleados.filter(
      empleado =>
        empleado.nombres?.toLowerCase().includes(filtroLowerCase) ||
        empleado.dni?.toString().includes(filtroLowerCase)
    );
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.empleadoForm.reset();
    this.mostrarModal = false;
  }

  buscarEmpleadoPorDni() {
    const dni = this.empleadoForm.get('dni')?.value;
    if (dni && /^\d{8}$/.test(dni)) {
      this.empleadoService.getEmpleadoDni(dni).subscribe(
        (empleado) => {
          if (empleado) {
            this.empleadoForm.patchValue({
              nombres: empleado.nombres,
              apellidos: empleado.apellidos,
              direccion: empleado.direccion,
              correoElectronico: empleado.correoElectronico,
              usuario: empleado.dni
            });
            this.notification.showMessage('Persona encontrada', 'success', 3000);
          } else {
            this.notification.showMessage('Persona no encontrada', 'warning', 3000);
          }
        },
        (error) => {
          this.notification.showMessage(`Error al buscar el empleado: ${error}`, 'error', 3000);
        }
      );
    } else {
      this.notification.showMessage('El DNI debe tener exactamente 8 dígitos', 'warning', 3000);
    }
  }

  guardarEmpleado() {
    if (this.empleadoForm.valid) {
      const formValues = this.empleadoForm.getRawValue();
      const nuevoEmpleado = {
        dni: formValues.dni,
        nombres: formValues.nombres,
        apellidos: formValues.apellidos,
        direccion: formValues.direccion,
        correoElectronico: formValues.correoElectronico,
        usuario: formValues.usuario,
        clave: formValues.clave,
        rol: [{ idRol: formValues.rol }] as [{ idRol?: number }]
      };

      this.empleadoService.crearEmpleado(nuevoEmpleado).subscribe(
        (empleado) => {
          this.listEmpleados.push(empleado);
          this.cerrarModal();
          this.notification.showMessage('Empleado creado exitosamente', 'success', 3000);
        },
        (error) => {
          this.notification.showMessage(`Error al crear el empleado ${error}`, 'error', 3000);
        }
      );
    } else {
      this.notification.showMessage('Por favor, complete todos los campos requeridos', 'warning', 3000);
    }
  }

  abrirModalEdit(empleado: Empleado) {
    this.empleadoId = empleado.idEmpleado?.valueOf() || null;
    this.empleadoEditForm.patchValue({
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      direccion: empleado.direccion,
      correoElectronico: empleado.correoElectronico,
      rol: empleado.rol ? empleado.rol[0].idRol : null
    });
    this.mostrarModalEdit = true;
    console.log(this.empleadoId + " id del empleado");
  }

  cerrarModalEdit() {
    this.mostrarModalEdit = false;
  }

  actualizarEmpleado() {
    if (this.empleadoId !== null) {
      const formValues = this.empleadoForm.getRawValue();
      const formEdit = this.empleadoEditForm.getRawValue();
      const empleadoActualizado: Empleado = {
        dni: formEdit.dni || formValues.dni,
        nombres: formEdit.nombres || formValues.nombres,
        apellidos: formEdit.apellidos || formValues.apellidos,
        direccion: formEdit.direccion || formValues.direccion,
        correoElectronico: formEdit.correoElectronico || formValues.correoElectronico,
        usuario: formValues.usuario,
        clave: formEdit.clave || formValues.clave,
        rol: [{ idRol: formEdit.rol || formValues.rol }]
      };
      console.log(empleadoActualizado);
      console.log(empleadoActualizado.dni);
      console.log(empleadoActualizado.nombres);
      console.log(empleadoActualizado.usuario);

      this.empleadoService.actualizarEmpleado(this.empleadoId, empleadoActualizado).subscribe(
        (empleado) => {
          const index = this.listEmpleados.findIndex(e => e.idEmpleado === this.empleadoId);
          if (index !== -1) {
            this.listEmpleados[index] = empleado;
          }
          this.cerrarModalEdit();
          this.notification.showMessage('Empleado actualizado exitosamente', 'success', 3000);
        },
        (error) => {
          this.notification.showMessage(`Error al actualizar el empleado: ${error}`, 'error', 3000);
        }
      );
    } else {
      this.notification.showMessage('Empleado no encontrado', 'warning', 3000);
    }
  }

  eliminarEmpleado(idEmpleado: number) {
    this.empleadoService.eliminarEmpleado(idEmpleado).subscribe(
      () => {
        this.listEmpleados = this.listEmpleados.filter(item => item.idEmpleado !== idEmpleado);
        this.notification.showMessage('Empleado eliminado exitosamente', 'success', 3000);
      },
      (error) => {
        this.notification.showMessage(`Error al eliminar el empleado ${error}`, 'error', 3000);
      }
    );
  }
}
