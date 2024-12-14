import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { comJob } from '../../../../models/jobPost';
import { ApiService } from '../../../../services/api-service/api.service';
import * as XLSX from 'xlsx';
import { AddPostComponent } from './components/add-post/add-post.component';
import { StorageService } from '../../../../services/Storage/storage.service';
import { environment } from '../../../../../environments/environment.development';


@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrl: './jobpost.component.css'
})
export class JobpostComponent implements OnInit {
  private isBrowser: boolean = false;
  onShow: boolean = true;
  posts!: any[];
  loginID!: string;
  baseImageUrl = environment.imageUrl

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private storageServe: StorageService,
    private apiServe: ApiService,
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

      console.log(userID)
      let _obj: comJob = {
        _id: userID as string
      }
      this.apiServe.processedGetJobPosts(_obj).subscribe(data => {
        this.posts = data
        console.log(this.posts);
      }, error => {
        console.error('Error fetching advertiesment:', error);
      })
    }
  }

  onShowMore(post: any): void {
    this.storageServe.setAddData(post);
    this.router.navigate(['/company/jobpost/post-profile']);
  }

  isPostProfileRoute(): boolean {
    return this.router.url === '/company/jobpost/post-profile';
  }

  onAddEdit(data: any) { }

  filename = 'allAdvertiesments.xlsx';
  exportExcel(): void {
    const data = this.posts.map((post, index) => ({
      'No': index + 1,
      'Job Title': post.job_title,
      'Expiration Date': post.ad_closing_date,
      'Job Description': post.job_description,
      'Position Summary': post.position_summary,
      'Requirement 1': post.requirement1,
      'Requirement 2': post.requirement2,
      'Location': `${post.city}, ${post.country}`
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.filename);
  }

  createJob(): void {
    this.dialog.open(AddPostComponent)
  }
}
