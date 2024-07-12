import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { UpSubCategory } from '../../../../../../models/category';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrl: './update-sub-category.component.css'
})
export class UpdateSubCategoryComponent implements OnInit {
  form: FormGroup
  mainCategory!: any;
  selectedCategoryId!: string
  constructor(private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiServe:ApiService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<UpdateSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.form = this._fb.group({
        jobsubcategory: ['', [Validators.required]],
        maincatID : ''
      })
      this.fetchCategories();
  }
  ngOnInit(): void {
    this.form.patchValue(this.data);
    this.fetchCategories()
  }
  onCategorySelectionChange(event: any): void {
    this.selectedCategoryId = event.value;
    console.log('Selected Category ID:', this.selectedCategoryId);

  }
  public fetchCategories(): void {
    this.apiServe.ProceedGetAllMainCat().subscribe({
      next: cat => {
        this.mainCategory = cat
      }
    }), (_error: any) => {
      console.error('Error fetching category:', _error);
    }
  }

  onSubCategoryUpdate():void {
    let category = this.form.getRawValue()
    category.maincatID = this.selectedCategoryId

    let _obj: UpSubCategory = {
      catInfo:category,
      oldCategory:  this.data.jobsubcategory as string
    }
    console.log(_obj)
    this.apiServe.ProceedSubUpCat(_obj).subscribe(items => {
      this.snackBar.open(items.message, 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      setTimeout(() => {
        window.location.href ='/admin/j-category';
        this._dialogRef.close();
       
      }, 1000);
    }, error => {
      this.toastr.error('error',error.message);
      this.snackBar.open(error.message, 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    })
  }
}
