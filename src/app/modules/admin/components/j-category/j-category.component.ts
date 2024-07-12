import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../../services/api-service/api.service';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UpdateSubCategoryComponent } from './components/update-sub-category/update-sub-category.component';
import * as XLSX from 'xlsx';
import { error } from 'console';

@Component({
  selector: 'app-j-category',
  templateUrl: './j-category.component.html',
  styleUrl: './j-category.component.css'
})
export class JCategoryComponent {

      title = 'Job Category';
    
      mainActivTable: boolean = false;
      subActivTable: boolean = true;
      mainCategory!: any;
      subCategory! : any;
    selectedTabIndex: any;
      constructor(private http: HttpClient,
        private snackBar: MatSnackBar,
        private Toast: NgToastService,
        public dialog: MatDialog,
      private apiServe:ApiService) {
    
      }
      ngOnInit(): void {
        this.fetchCategories();
        this.fetchSubCategories();
      }
      showMainTable(): void{
    this.mainActivTable = !this.mainActivTable;
    if(this.mainActivTable){
      this.subActivTable = false;
    }else{
      this. subActivTable=true;
    }
      }
    
      onNewCategory() {
        this.dialog.open(NewCategoryComponent)
      }
      onNewSubCategory(){
        this.dialog.open(AddSubCategoryComponent)
      }
      onCategoryDelete(cat: any): void {
    
        const dialogRef = this.dialog.open(DeleteCategoryComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.http.get<any[]>(`http://localhost:5000/api//delete-category/${cat.jobcategory}`).subscribe({
              next: (data) => {
                // this.Toast.success({ detail: "category Deleted", summary: 'Category Deleted successfully', duration: 7000, position: 'botomCenter' })
                console.log('Category deleted successfully');
                this.fetchCategories();
              },
              error: (error) => {
                console.error('Error deleting category:', error);
              }
            });
          }
        });
    
    
    
      }
    
      onCategoryEdit(cat: any): void {
        this.dialog.open(UpdateCategoryComponent, {data: cat}
    
        );
        console.log(cat);
      }
      // onSubCategoryEdit(sub: any): void {
      //   this.dialog.open(UpdateSubCategoryComponent, {data: sub}
    
      //   );
      //   console.log(sub);
      // }
      onSubCategoryEdit(sub: any): void {
        this.dialog.open(UpdateSubCategoryComponent, {
            data: sub // Pass the selected subcategory data to the dialog
        });
    }
    
    
    
      displayedColumns: string[] = [
        'index',
        'category',
        'Subcategory',
        'actions'
      ];
      displayedmainColumns: string[] = [
        'index',
        'category',
        'actions'
      ];

      // this.userService.ProceedTempUsers().subscribe({
      //   next: users => {
      //     this.tempUsers = users
      //   },
      //   error: (error: any) => {
      //     console.error('Error fetching temp users:', error);
      //   }
      // });
    
      public fetchSubCategories():void {
this.apiServe.ProceedGetAllSubCat().subscribe({
  next: cat =>{
    this.subCategory= cat
  }
}),(_error: any)=>{
  console.error('Error fetching sub category:', _error);
}


        // this.categoryService.loadjobsubcate().subscribe(
        //   (data)=>{
        //     this.subCategory= data
        //   },
        // (error)=>{
        //   console.error('Error fetching sub category:', error);
        // })
      }
    
      public fetchCategories(): void {
        
        // this.categoryService.loadjobmaincate().subscribe(
        //   (data) => {
        //     //this.SearchText
        //     this.mainCategory = data;
    
        //   },
        //   (error) => {
        //     console.error('Error fetching main category:', error);
        //   }
        // );
      }
    
      filename = 'ExcelSheet.xlsx';
      exportExcel() {
        const data = document.getElementById('table-data');
        if (data) {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          XLSX.writeFile(wb, this.filename);
        } else {
          console.error('Element with ID "table-data" not found.');
        }
      }
}
