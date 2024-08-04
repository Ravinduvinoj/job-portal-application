import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/Storage/storage.service';

@Component({
  selector: 'app-joblistnings',
  templateUrl: './joblistnings.component.html',
  styleUrl: './joblistnings.component.css'
})
export class JoblistningsComponent implements OnInit{
  private isBrowser: boolean = false;



  onShow: boolean = true;
  posts!: any[];
  // authenticated: boolean;
  loginID!: string | null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private storageServe:StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updatetbl();

  }
  updatetbl(): void {
    if (this.isBrowser) {
      let userID = localStorage?.getItem('_id');


        this.loginID = userID
        console.log('login Id is ' + this.loginID)
          const apiUrl = `http://localhost:5000/api/add-display/${this.loginID}`; // Update the API URL as per your backend route

          this.http.get<any[]>(apiUrl).subscribe(
            (data) => {
              //this.SearchText
              this.posts = data;
              if (!this.posts) {
                console.log("no data")
              }
              console.log("not empty")
            },
            (error) => {
              console.error('Error fetching advertiesment:', error);
            }
          );
    }
  }

  onShowMore(postdata: any) {
    this.storageServe.setJobListningData(postdata)
     this.router.navigate(['/company/joblistnings/view-listning']);
  }

  isViewListningsRoute(): boolean {
    return this.router.url === '/company/joblistnings/view-listning';
  }
  onAddEdit(_t14: any) {

  }
}
