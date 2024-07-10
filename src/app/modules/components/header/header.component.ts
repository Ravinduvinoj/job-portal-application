import { Component } from '@angular/core';

interface navToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
