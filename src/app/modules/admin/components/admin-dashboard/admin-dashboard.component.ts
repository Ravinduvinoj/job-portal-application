import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api-service/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  companycount: any
  adcount: any
  appcount: any
  seekers: any

  constructor(private apiServe: ApiService) {}
  ngOnInit(): void {
    //count all companies
    this.apiServe.processedGetComCount().subscribe(
      (data) => {
        this.companycount = data;
        console.log(this.companycount);
      }
    );
    //count all ad
    this.apiServe.processedGetAdCount().subscribe(
      (data) => {
        this.adcount = data;
        console.log(this.adcount);
      }
    );
    //count all applications
    this.apiServe.processedGetAppCount().subscribe(
      (data) => {
        this.appcount = data;
        console.log(this.appcount);
      }
    );
    //count all jobseekers
    this.apiServe.processedGetSeekerCount().subscribe(
      (data) => {
        this.seekers = data;
        console.log(this.seekers);
      }
    );

  }
}
