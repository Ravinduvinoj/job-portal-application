import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDeleteComponent } from '../add-delete/add-delete.component';
import { StorageService } from '../../../../../../services/Storage/storage.service';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-profile',
  templateUrl: './post-profile.component.html',
  styleUrl: './post-profile.component.css'
})
export class PostProfileComponent {
  post: any = null;

  constructor(
    private storageServe: StorageService,
    public dialog: MatDialog,
    private apiServe: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.post = this.storageServe.getAddata()
    console.log(this.post);
  }

  onPostDelete(cat: any): void {
    const dialogRef = this.dialog.open(AddDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiServe.processedDeletePost(cat).subscribe(data => {
          this.toast.success('post Deleted successfully', 'post Deleted')
          console.log('Post deleted successfully');
          setTimeout(() => {
            window.location.href = '/company/jobpost';
          }, 1000);
        }, error => {
          this.toast.error(error.message,'post unable to Delete ')
          console.error('Error deleting post:', error);
        })
      }
    });
  }
}
