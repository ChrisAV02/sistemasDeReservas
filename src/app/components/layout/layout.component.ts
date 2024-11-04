import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { SidebardComponent } from '../sidebard/sidebard.component';

@Component({
  selector: 'app-components-layout',
  standalone: true,
  imports:[
    HeaderComponent,
    SidebardComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
