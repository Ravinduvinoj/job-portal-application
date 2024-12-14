import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RemoveApprovalComponent } from '../remove-approval/remove-approval.component';
import { StorageService } from '../../../../../../services/Storage/storage.service';
import { JobAdDelete } from '../../../../../../models/jobApproval';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { environment } from '../../../../../../../environments/environment.development';

@Component({
  selector: 'app-approval-profile',
  templateUrl: './approval-profile.component.html',
  styleUrl: './approval-profile.component.css'
})
export class ApprovalProfileComponent implements OnInit {

  post: any = null;
  baseImageUrl = environment.imageUrl;
  constructor(
    private Toast: ToastrService,
    private storage: StorageService,
    public dialog: MatDialog,
    private apiServe: ApiService
  ) { }

  ngOnInit(): void {
    this.post = this.storage.getJobData()
    console.log(this.post);
  }

  //approved or reject pendings
  onPostDelete(cat: any): void {
    const dialogRef = this.dialog.open(RemoveApprovalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let _obj: JobAdDelete = {
          jobid: cat as string
        }
        console.log(_obj)
        this.apiServe.processedDeleteJobPending(_obj).subscribe(items => {
          this.Toast.success('post Deleted', 'post Deleted successfully');
          setTimeout(() => {
            window.location.href = '/admin/jobapproval';
          }, 1000);
        },
          (error) => {
            this.Toast.error(error, 'Something wrong ');
          })
      }
    });
  }
}
