import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ViewListningsComponent } from '../view-listnings/view-listnings.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent implements OnInit {
  @Input() com!: ViewListningsComponent;
  private isBrowser: boolean = false;
  form: FormGroup;
  date: Date | null;
  time: string | null;
  minDate: Date;

loginID!: string| null;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<ApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.date = null;
    this.time = null;
    this.minDate = new Date(); // Today's date
    this.form = this._fb.group({
      location: ['', Validators.required],
      description: ['', Validators.required],
      interiview_date: ['', Validators.required],
      interiview_time: ['', Validators.required],
      email: '',
      login_id:''
    });
  }

  ngOnInit(): void {
    this.get_user();
  }

  getDateTime(): Date | undefined {
    if (this.date && this.time) {
      const [hours, minutes] = this.time.split(':');
      const dateTime = new Date(this.date);
      dateTime.setHours(parseInt(hours, 10));
      dateTime.setMinutes(parseInt(minutes, 10));
      return dateTime;
    }
    return undefined;
  }

  
get_user(): void {
  if (this.isBrowser) {
    let userID = localStorage?.getItem('_id');
        this.loginID = userID


  }

}

  onApprovalSubmit(): void {
    let appdata = this.form.getRawValue();
    const id = this.data._id;
    appdata.email = this.data.jobseeker.email;
    appdata.login_id = this.loginID;

    if (!this.form.valid) {
      this.snackBar.open("Please fill all the fields or enter valid details", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.http.post<any>(`http://localhost:5000/api/app/schedule/${id}`, appdata)
      .subscribe(
        (response) => {
          this.snackBar.open('Approved and interview scheduled successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          setTimeout(() => {
            window.location.href = 'company/joblistnings/';
            this._dialogRef.close();
          }, 500);
        },
        (error) => {
          this.snackBar.open('Failed to approve', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          console.error('Error approving:', error);
        }
      );
  }
}
