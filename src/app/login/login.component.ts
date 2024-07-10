import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]); //check email validation using angular material components

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //get form data
    this.form = this.formbuilder.group({
      email: "",
      password: "",
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

  submit(): void { }

}
