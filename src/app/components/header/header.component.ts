import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-components-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private renderer: Renderer2) {}

  darkMode(event: any) {
    if (event.target.checked) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
