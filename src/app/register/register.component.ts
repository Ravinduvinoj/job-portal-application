import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form!: FormGroup
  emailFormControl = new FormControl('', [Validators.required, Validators.email]); //email validation


  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
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
   initializeForm(){
      //get forms data
      this.form = this.formbuilder.group({
        company: ['', [Validators.required]],
        contact: ['', [Validators.required, Validators.pattern("^((\\+94-?)|0)?[0-9]{9}$")]],
        email: "",
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
          ]
        ],
        con_password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
          ]
        ],
        companyurl: ['', [Validators.required]],
        userRole: "company",
        city: ['', Validators.required],
        address: ['', Validators.required]
      })
   }

  //check email validation again
  ValidateEmail = (email: any) => {
    var ValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(ValidRegex)) {
      return true;
    } else {
      return false;
    }
  }

  //check confim pass equality
  checkpass = (pass: any, con_pass: any) => {
    if (pass == con_pass) {
      return true;
    } else {
      return false;
    }
  }

  // submit form data with validate data
  submit(): void {
<<<<<<< HEAD
=======
    let user = this.form.getRawValue()
    user.email = this.emailFormControl.value;
    if (user.company == "" || user.contact == "" || this.emailFormControl.value == "" || user.contact == '' || user.city == '' || user.address == '' || user.password == "" || user.con_password == "" || user.companyurl == "") {
      this._snackBar.open("please  enter all the fields", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else if (!this.ValidateEmail(this.emailFormControl.value)) {
      this._snackBar.open("please  enter valid email", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })


    } else if (!this.form.valid) {
      this._snackBar.open("please enter valid details", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })

    } else if (!this.checkpass(user.password, user.con_password)) {
      this._snackBar.open("Your password does not match", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else {

      let _obj: TempComReg = {
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
      this.userService.ProceedCompanyRegTemp(_obj).subscribe(items => {
        this.toastr.success('Thank you!!!', 'Your registration is sent please wait for admin approve');
        this.router.navigate(['/']);

      }, error => {
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        })
      }
      )
    }
>>>>>>> 5048ed4 (up)
  }
}
