import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { addSubCategory } from '../../../../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css'
})
export class AddSubCategoryComponent {

  form!: FormGroup
  mainCategory!: any;
  selectedCategoryId!: string
  subcategoryName!: string;

  constructor(private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiServe: ApiService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<AddSubCategoryComponent>) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      SubCategory: ['', [Validators.required]],
      Maincategory: ['', [Validators.required]]
    })
    this.fetchCategories();
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

  onCategorySelectionChange(event: any): void {
    this.selectedCategoryId = event.value;
    console.log('Selected Category ID:', this.selectedCategoryId);
  }

  onSubCategoryAdd() {
    let subCat = this.form.getRawValue()
    if (subCat.SubCategory == '') {
      this.snackBar.open("please enter a category name", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else if (this.selectedCategoryId == undefined) {
      this.snackBar.open("please select a category", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })
    } else {
      let _obj: addSubCategory = {
        mainCatId: this.selectedCategoryId as string,
        categoryData: subCat
      }
      console.log(_obj)
      this.apiServe.ProceedAddSubCat(_obj).subscribe(items => {
        this.toastr.success('category Created', 'sub category creation successfully');
        setTimeout(() => {
          window.location.href = '/admin/j-category';
          this._dialogRef.close();
        }, 1000);
      }, error => {
        this.toastr.error('error', error.error.message);
      })
    }
  }
}
