import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';
import { loginresp, usercred } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private isBrowser: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {

    this.initializeForm();

  }

  form!: FormGroup;
  _response!: loginresp;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]); //check email validation using angular material components



  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    //clear local storage before login
    if (isPlatformBrowser(this.platformId)) {
      // Clear local storage before login
      localStorage.clear();
    }
  }

  initializeForm() {
    // Initialize form controls
    this.form = this.formbuilder.group({
      email: this.emailFormControl,
      password: ['', [Validators.required]],
      userRole: ['company']
    });
  }

  //check email validation
  ValidateEmail = (email: any) => {
    var ValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(ValidRegex)) {
      return true;
    } else {
      return false;
    }
  }

  submit(): void {
    //getting raw value in the form
    let user = this.form.getRawValue()
    user.email = this.emailFormControl.value; //asign email compenent assigned value

    //check email & password is empty
    if (user.email == "" || user.password == "") {
      this._snackBar.open("please  enter all the fields", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
      this.toastr.error('please  enter all the fields', 'error');

    } else if (!this.ValidateEmail(this.emailFormControl.value)) {//check login email is validation
      this._snackBar.open("please  enter valid email", 'Close', {

        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
      this.toastr.error('please  enter valid email', 'error');

    } else {

      let _obj: usercred = {
        email: this.emailFormControl.value as string,
        password: this.form.value.password as string
      }
      console.log(_obj)

      this.userService.Proceedlogin(_obj).subscribe(items => {
        this._response = items;
        console.log(this._response);
      
        if (this.isBrowser) {
          if (this._response && this._response.email && this._response.token) {
            window.localStorage.setItem('token', this._response.token);
            window.localStorage.setItem('email', this._response.email);  // Changed from _response.data.email
            window.localStorage.setItem('_id', this._response._id);  // Changed from _response.data._id
            window.localStorage.setItem('userRole', this._response.userRole);
            window.localStorage.setItem('company', this._response.company);  // Changed from _response.data.company
      
            // Check role base
            if (this._response.userRole === "admin") {
              this.router.navigate(['/admin/admin-dashboard']);
            } else if (this._response.userRole === "company") {
              this.router.navigate(['/company/dashboard']);
            }
          } else {
            this.toastr.error('Failed to login', 'Missing data');
          }
        } else {
          this.toastr.error('Failed to login', 'null local storage');
        }
      }, error => {
        this.toastr.error('Failed to login', error.error.message);
      });

    }
  }

}
