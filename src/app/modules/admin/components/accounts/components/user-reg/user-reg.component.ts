
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { DirectComReg, DirectComRegRes } from '../../../../../../models/user';
import { UserService } from '../../../../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrl: './user-reg.component.css'
})
export class UserRegComponent {
  form!: FormGroup;
  _response!:DirectComRegRes
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(private formbuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private userService: UserService,
    private _dialogRef: MatDialogRef<UserRegComponent>) {
    //getting data with validation
    this.form = this.formbuilder.group({

      company: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern("^((\\+94-?)|0)?[0-9]{9}$")]],
      email: "",
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]
      ],
      con_password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]
      ],
      companyurl: ['', [Validators.required]],
      userRole: "company",
      city: ['', Validators.required],
      address: ['', Validators.required]
    })
  }
//check validation email again
  ValidateEmail = (email: any) => {
    var ValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(ValidRegex)) {
      return true;
    } else {
      return false;
    }
  }

  //checking passowrd
  checkpass = (pass: any, con_pass: any) => {
    if (pass == con_pass) {
      return true;
    } else {
      return false;
    }
  }

  onCompanySubmit() {
    // set raw values
    let user = this.form.getRawValue()
    user.email = this.emailFormControl.value;

    console.log(user);
    if (user.company == "" || user.contact == "" || this.emailFormControl.value == "" || user.contact == '' || user.city == '' || user.address == '' || user.password == "" || user.con_password == "" || user.companyurl == "") {
      this.snackBar.open("please  enter all the fields", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else if (!this.ValidateEmail(this.emailFormControl.value)) {
      this.snackBar.open("please  enter valid email", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else if (!this.form.valid) {
      this.snackBar.open("please enter valid details", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })

    } else if (!this.checkpass(user.password, user.con_password)) {
      this.snackBar.open("Your password does not match", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else {

      let _obj: DirectComReg = {
        email: this.emailFormControl.value as string,
        company: user.company as string,
        contact: user.contact as string,
        password: user.password as string,
        companyurl: user.companyurl as string,
        userRole: user.userRole as string,
        city: user.city as string,
        address: user.address as string
      }
      console.log(_obj)

      //set api to user
      this.userService.ProceedCompanyRegDirect(_obj).subscribe(items => {
        this._response = items
        console.log(this._response)

        this.toastr.success('Thank you!!!', 'Your registration successfully and sent the email');
        setTimeout(() => {
          window.location.href = '/admin/accounts';
          this._dialogRef.close();
        }, 1000);
        this._dialogRef.close();
      },
        (error) => {
          this.toastr.success('Failed to register user', error.error.message);
          console.error('Error updating user:', error);
        }
      )



   
    }
  }
}
