import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../../services/api-service/api.service';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UpdateSubCategoryComponent } from './components/update-sub-category/update-sub-category.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-j-category',
  templateUrl: './j-category.component.html',
  styleUrl: './j-category.component.css'
})
export class JCategoryComponent {

  mainActivTable: boolean = false;
  subActivTable: boolean = true;
  mainCategory!: any;
  subCategory!: any;
  selectedTabIndex: any;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private Toast: NgToastService,
    public dialog: MatDialog,
    private apiServe: ApiService) {

  }
  ngOnInit(): void {
    this.fetchCategories();
    this.fetchSubCategories();
  }

  showMainTable(): void {
    this.mainActivTable = !this.mainActivTable;
    if (this.mainActivTable) {
      this.subActivTable = false;
    } else {
      this.subActivTable = true;
    }
  }

  onNewCategory() {
    this.dialog.open(NewCategoryComponent)
  }

  onNewSubCategory() {
    this.dialog.open(AddSubCategoryComponent)
  }

  onCategoryEdit(cat: any): void {
    this.dialog.open(UpdateCategoryComponent, { data: cat }
    );
    console.log(cat);
  }

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

fetchSubCategories(): void {
    this.apiServe.ProceedGetAllSubCat().subscribe({
      next: cat => {
        this.subCategory = cat
      }
    }), (_error: any) => {
      console.error('Error fetching sub category:', _error);
    }
  }

fetchCategories(): void {
  this.apiServe.ProceedGetAllMainCat().subscribe({
    next: cat => {
      this.mainCategory = cat
    }
  }), (_error: any) => {
    console.error('Error fetching category:', _error);
  }
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
