import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpCategory } from '../../../../../../models/category';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  form: FormGroup

  constructor(private _fb: FormBuilder,
    private apiserve:ApiService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.form = this._fb.group({
      jobcategory: "",
    })
  }

  ngOnInit(): void {
   this.form.patchValue(this.data);
  }

  onCategoryUpdate() {
    let _obj: UpCategory = {
      jobcategory:this.form.value,
      oldCategory:  this.data.jobcategory as string
    }
    console.log(_obj)
    this.apiserve.ProceedUpCat(_obj).subscribe(items => {
      this.toastr.success('category updated', items.message);
      setTimeout(() => {
        window.location.href ='/admin/j-category';
        this._dialogRef.close();
      }, 1000);
    }, error => {
      this.toastr.error('error',error.message);
    })
  }
}

