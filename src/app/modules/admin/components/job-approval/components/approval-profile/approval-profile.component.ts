import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RemoveApprovalComponent } from '../remove-approval/remove-approval.component';

@Component({
  selector: 'app-approval-profile',
  templateUrl: './approval-profile.component.html',
  styleUrl: './approval-profile.component.css'
})
export class ApprovalProfileComponent implements OnInit{

  post: any = null;

  constructor(
    private Toast: ToastrService,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {

    
    this.post =  
    console.log(this.post);
  

  }
  onPostDelete(cat: any): void {

    const dialogRef = this.dialog.open(RemoveApprovalComponent);
    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.http.get<any[]>(`http://localhost:5000/api/post/delete/${cat}`).subscribe({
      //     next: (data) => {
      //       this.Toast.success({ detail: "post Deleted", summary: 'post Deleted successfully', duration: 7000, position: 'botomCenter' })
      //       console.log('Post deleted successfully');
      //       setTimeout(() => {
      //         window.location.href ='/admin/jobapproval';
           
      //       }, 1000);
      //     },
      //     error: (error) => {
      //       console.error('Error deleting post:', error);
      //     }
      //   });
      // }
    });

}
}
