import { HttpClient } from '@angular/common/http';
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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  _response!: loginresp;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
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

  ValidateEmail(email: any): boolean {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
  }

  submit(): void {
    let user = this.form.getRawValue();
    user.email = this.emailFormControl.value;

    if (!user.email || !user.password) {
      this._snackBar.open("Please enter all the fields", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      this.toastr.error('Please enter all the fields', 'Error');
      return;
    }

    if (!this.ValidateEmail(this.emailFormControl.value)) {
      this._snackBar.open("Please enter a valid email", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      this.toastr.error('Please enter a valid email', 'Error');
      return;
    }

    let _obj: usercred = {
      email: this.emailFormControl.value as string,
      password: this.form.value.password as string
    };

    this.userService.Proceedlogin(_obj).subscribe(
      (items) => {
        this._response = items;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', this._response.token);
          localStorage.setItem('email', this._response.data.email);
          localStorage.setItem('_id', this._response.data._id);
          localStorage.setItem('userRole', this._response.userRole);
          localStorage.setItem('company', this._response.data.company);
        }

        if (this._response.userRole === "admin") {
          this.router.navigate(['/admin/admin-dashboard']);
        } else if (this._response.userRole === "company") {
          this.router.navigate(['/company/dashboard']);
        }
      },
      (error) => {
        this.toastr.error('Failed to login', error.error.message);
      }
    );
  }
}
