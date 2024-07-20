import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../../../services/api-service/api.service';
import { isPlatformBrowser } from '@angular/common';
import { com_dash } from '../../../../models/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private isBrowser: boolean = false;
  ad!: String
  approved!: String
  totalApp!: String

  constructor(private apiServe: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      let userID = localStorage?.getItem('_id');

      console.log(userID)
      let _obj: com_dash = {
        _id: userID as string
      }

      // count all ad for company
      this.apiServe.processedGetComAds(_obj).subscribe(data => {
        this.ad = data?.count;
        console.log(this.ad);
      })

      //count all ad for approved
      this.apiServe.processedGetAdsListnings(_obj).subscribe(data => {
        this.approved = data?.count;
        console.log(this.approved);
      })
      
      //count all ads for applixations
      this.apiServe.processedGetApplications(_obj).subscribe(data => {
        this.totalApp = data?.count;
        console.log(this.totalApp);
      })
    }
  }
}
