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
  }
}
