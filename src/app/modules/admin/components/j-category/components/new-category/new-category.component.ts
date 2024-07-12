import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { addCategory } from '../../../../../../models/category';
import { ApiService } from '../../../../../../services/api-service/api.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit {

  form!: FormGroup

  constructor(private _fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private apiserve: ApiService,
    private _dialogRef: MatDialogRef<NewCategoryComponent>) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      categoryname: ['', [Validators.required]],
    })
  }

  onCategoryAdd() {
    let category = this.form.getRawValue()
    if (category.categoryname == '') {
      this.snackBar.open("please fill the form", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else {
      let _obj: addCategory = {
        categoryname: category.categoryname as string
      }
      console.log(category)
      this.apiserve.ProceedAddCat(_obj).subscribe(items => {
        this.toastr.success('category Created', 'job category creation successfully');
        this._dialogRef.close();
      }, error => {
        this.toastr.error('error', error.error.message);
      })
    }
  }
}
