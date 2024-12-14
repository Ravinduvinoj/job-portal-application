
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../../../services/api-service/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../../../environments/environment.development';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  private isBrowser: boolean = false;
  form!: FormGroup
  // addver_data: add_data;
  mainCategory!: any;
  subCategory!: any[];
  imageData!: string | ArrayBuffer | null;
  selectedCategoryId: string | undefined;
  selectedSubCategoryId: string | undefined;
  subcategoryName!: string;
  baseUrl = environment.apiUrl;

  selectedFile!: File;
  loginID!: string | null;
  minDate: Date;
  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private apiServe:ApiService,
    private _dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
      this.minDate = new Date();
      console.log(this.minDate)
      this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    this.get_user()
    this.fetchCategories();
    this.form = this._fb.group({
      job_title: ['', [Validators.required]],
      // selectcategory: '',
      jobsubcategory: '',
      JobCategory: '',
      image: ['', Validators.required],
      job_description: ['', [Validators.required]],
      requirement1: "",
      requirement2: '',
      position_summary: '',
      ad_closing_date: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      User: ''


    })

  }



  OnFileSelect(event: any) {
    this.selectedFile = event.target.files[0]; // Access files array
    this.form.patchValue({ Image: this.selectedFile });
    const allowedimgtype = ["image/png", "image/jpeg", "image/jpg"];
    if (this.selectedFile && allowedimgtype.includes(this.selectedFile.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result; // Assign reader.result directly
        return this.imageData
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageData = null; // Reset imageData if file type is not allowed
    }
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
    const apiUrl = `${this.baseUrl}getselectedmaincategory/${this.selectedCategoryId}`; // Update the API URL as per your backend route

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        //this.SearchText
        this.subCategory = data;

      },
      (error) => {
        console.error('Error fetching job sub category:', error);
      }
    );

  }
  onSubCategorySelectionChange(event1: any): void {
    this.selectedSubCategoryId = event1.value;
    console.log('Selected sub Category ID:', this.selectedSubCategoryId);

  }
  get_user(): void {
    if (this.isBrowser) {
      let userID = localStorage?.getItem('_id');
      this.loginID = userID
  }

  }
 
  onPostAdd() {
    let post = this.form.getRawValue()
    post.image = this.selectedFile;
    post.JobCategory = this.selectedCategoryId;
    post.jobsubcategory = this.selectedSubCategoryId;
    post.User = this.loginID;
    if (this.form.invalid) {
      this.snackBar.open("please  enter all the fields valid data", 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      })

    } else {

      const formData = new FormData();

      formData.append("job_title", post.job_title);
      formData.append("job_description", post.job_description);
      formData.append("position_summary", post.position_summary);
      formData.append("ad_closing_date", post.ad_closing_date);
      formData.append("requirement1", post.requirement1);
      formData.append("requirement2", post.requirement2);
      formData.append("country", post.country);
      formData.append("city", post.city);
      formData.append("JobCategory", post.JobCategory);
      formData.append("jobsubcategory", post.jobsubcategory);
      formData.append("User", post.User);
      formData.append("image", post.image);

      console.log(post);
      this.http.post(`${this.baseUrl}add-post`, formData, {
        withCredentials: true
      
      })
        .subscribe(() => {
          // this.Toast.success({ detail: "job posted", summary: 'sub category creation successfully', duration: 9000, position: 'botomCenter' })
         
         setTimeout(() => {
              window.location.href ='/company/jobpost';
              this._dialogRef.close();
            }, 1000);

        },
          (err) => {
            this.snackBar.open(err.error.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            })
          })
    }
  }
}
