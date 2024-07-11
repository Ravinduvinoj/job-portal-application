import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Note the correct property name is styleUrls, not styleUrl
})
export class HeaderComponent implements OnInit {
  private isBrowser: boolean = false;

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  openDialog() { }

  title = 'Navbar';
  collapsed = false;
  message: any;
  dashboard: any;
  type: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      let userRole = localStorage?.getItem('userRole');
      let company = localStorage?.getItem('company');

      this.message = company;
      if (userRole === 'admin') {
        this.dashboard = 'Admin panel';
      } else if (userRole === 'company') {
        this.dashboard = 'Company panel';
      } else {
        this.message = "you are not logged in";
      }
    }
  }
}
