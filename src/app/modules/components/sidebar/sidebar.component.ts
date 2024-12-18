import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { adminData, comData } from './side-data';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  ngOnInit(): void {
    let userRole = localStorage.getItem('userRole') as string;
    if(userRole =="admin"){
      this.navData=adminData;
    }else if(userRole=="company"){
      this.navData=comData;
    }
  }

  @Output() onToggleSidenav: EventEmitter<SidenavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData: any =adminData;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })

  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })

  }

  logout(): void {
    localStorage.clear();
  }

}
