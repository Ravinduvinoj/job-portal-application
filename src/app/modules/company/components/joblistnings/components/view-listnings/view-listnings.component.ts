import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { ApprovalComponent } from '../approval/approval.component';
import { saveAs } from 'file-saver';
import { StorageService } from '../../../../../../services/Storage/storage.service';

@Component({
  selector: 'app-view-listnings',
  templateUrl: './view-listnings.component.html',
  styleUrl: './view-listnings.component.css'
})
export class ViewListningsComponent implements OnInit{
  HistoryActivTable: boolean = false;
  PendingActivTable: boolean = true;
  posts: any;//any type for array
  History: any;//any type for array
  title!: String;
  constructor(
    // private viewapp: ListningsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private Toast: ToastrService,
    private storageServe:StorageService) { }

  ngOnInit(): void {
    //Fetching data pending applications for advertiesment 

    // this.viewapp.getjobapp().subscribe(
    //   (data) => {
    //     this.posts = data;
    //     console.log(this.posts);
    //   },
    
    //   error => {
    //     console.error('Error fetching pending applications:', error);
    //   });

    //Fetching data Approved & Reject applications for advertiesment 
    // this.viewapp.getHistoryapp().subscribe(
    //   (data) => {
    //     this.History = data.applications;
    //     console.log(this.History);
    //   },
    //   error => {
    //     console.error('Error fetching history applications:', error);
    //   }
    // );

    const data = this.storageServe.getJobListningData()
    this.title = data.job_title;
  }

  showMainTable(): void {
    this.HistoryActivTable = !this.HistoryActivTable;
    if (this.HistoryActivTable) {
      this.PendingActivTable = false;
    } else {
      this.PendingActivTable = true;
    }
  }

  //download cv for local storage
  downloadCV(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const fileName = url.split('/').pop();
      saveAs(blob, fileName);
    }, error => {
      console.error('Download error:', error);
    });
  }

  setapprove(application: any) {
    this.dialog.open(ApprovalComponent, { data: application });
  }

  onReject(application: any): void {
    const dialogRef = this.dialog.open(RejectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put<any>(`http://localhost:5000/api/reject/schedule/${application._id}`, {}).subscribe({
          next: (data) => {
            console.log('application rejected successfully');
            this.Toast.success('application rejected successfully' , 'Rejected')

          },
          error: (error) => {
            console.error('Error reject application:', error);
          }
        });
      }
    });
  }
}
