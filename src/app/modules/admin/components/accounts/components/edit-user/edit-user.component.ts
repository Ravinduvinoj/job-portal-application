import { Component, Inject, Input } from '@angular/core';
import { AccountsComponent } from '../../accounts.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpUser, UpUserRes } from '../../../../../../models/user';
import { UserService } from '../../../../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  @Input() com!: (AccountsComponent);

  form: FormGroup;
  _response!: UpUserRes;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);//validate email


  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<EditUserComponent>,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this._fb.group({//geting user input data
      company: "",
      contact: "",
      email: "",
      password: "",
      con_password: "",
      companyurl: "",
      userRole: "company",
      city: "",
      address: ""
    })
  }

  ngOnInit(): void {
    this.form.patchValue(this.data)
    this.emailFormControl.patchValue(this.data.email)
  }

  //update user data
  onFormSubmit() {

    let _obj: UpUser = {
      email: this.emailFormControl.value as string,
      data: this.form.value as any
    }
    console.log(_obj)

    this.userService.ProceedUpdateUser(_obj).subscribe(items => {
      this._response = items
      console.log(this._response)
      this.toastr.success('User updated successfully', 'correct');
      setTimeout(() => {
        window.location.href = '/admin/accounts';
        this._dialogRef.close();
      }, 1000);
      this._dialogRef.close();
    },
      (error) => {
        this.toastr.success('Failed to update user', error.error.message);
        console.error('Error updating user:', error);
      }
    )
  }
}
