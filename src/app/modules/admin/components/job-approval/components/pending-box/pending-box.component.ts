import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { JobAdPending } from '../../../../../../models/jobApproval';

@Component({
  selector: 'app-pending-box',
  templateUrl: './pending-box.component.html',
  styleUrl: './pending-box.component.css'
})
export class PendingBoxComponent {

  posts!: any[];

  constructor(
    private Toast: ToastrService,
    private apiServe: ApiService
  ) { }

  ngOnInit(): void {
    this.fetch_Ad()
  }

  // getting addvertiesment data form API service
  fetch_Ad(): void {
    this.apiServe.processedGetPendings().subscribe(result => {
      this.posts = result?.data;
      console.log(this.posts);
    })
  }

  //approve the job pendings
  postapprove(data: any) {
    console.log(data._id)
    let _obj: JobAdPending = {
      jobid: data._id as string
    }
    this.apiServe.processedAppJobPending(_obj).subscribe(result => {
      this.Toast.success('advertiesment approved successfully', "advertiesment has been posted");
      this.fetch_Ad()
    }, error => {
      this.Toast.error('Failed to login', error.message);
    })
  }

  onShowMore(data: any) { }
}
