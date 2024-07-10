import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user/user.service';
import { loginresp, usercred } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService,
    private userService: UserService

  ) { }

  _response!: loginresp;

  form!: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]); //check email validation using angular material components



  ngOnInit(): void {
    //get form data
    this.form = this.formbuilder.group({
      email: "",
      password: ['', [Validators.required]],
      userRole: "company",
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
        this._response = items
        console.log(this._response)
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('email', this._response.data.email);
        localStorage.setItem('_id', this._response.data._id);
        localStorage.setItem('userRole', this._response.userRole);
        localStorage.setItem('company', this._response.data.company);

             //check role base
           if (this._response.userRole === "admin") {
             this.router.navigate(['/home']);
           } else if (this._response.userRole === "company") {
             this.router.navigate(['/register']);
           }

      },error=>{
        this.toastr.error('Failed to login', error.error.message);
      }
    )



      //  this.http.post("http://localhost:5000/api/login", user, {//set login data to login api
      //    withCredentials: true
      //  }).subscribe(
      //    (res: any) => {
      //      //check role base
      //      if (res.userRole === "admin") {
      //        this.router.navigate(['/admin']);
      //      } else if (res.userRole === "company") {
      //        this.router.navigate(['/company']);
      //      }
      //    },
      //    (err) => {

      //      this._snackBar.open("detail: "+err.error.message, 'Close', {
      //       duration: 3000,
      //       verticalPosition: 'bottom',
      //       horizontalPosition: 'center'
      //     })
      //    }
      //  )
    }
  }

}
