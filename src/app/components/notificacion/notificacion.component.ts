import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  public message: string = '';
  public show: boolean = false;
  public type: 'success' | 'warning' | 'error' = 'success';

  constructor() { }

  ngOnInit(): void {
  }

  showMessage(message: string, type: 'success' | 'warning' | 'error', duration: number = 3000): void {
    this.message = message;
    this.type = type;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, duration);
  }
}
