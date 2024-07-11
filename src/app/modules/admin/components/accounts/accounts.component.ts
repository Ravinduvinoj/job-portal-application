import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../services/user/user.service';
import { MessageComponent } from './components/message/message.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserRegComponent } from './components/user-reg/user-reg.component';
import { approveTempAcc, deleteTempAcc, deleteUserAcc } from '../../../../models/user';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  [x: string]: any;
  SearchText: any;
  tempUsers: any// Initialize as an empty array
  userAccounts!: any;
  clickEventSubscription!: Subscription;
  showTable: boolean = false;
  activTable: boolean = true;
  pdfTable: any

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.fetchTempUsers();
    this.fetchUserAccounts();
  }
  //delete selected user
  onUserDelete(User: any): void {
    if (User.userRole == 'admin') {
      this.snackBar.open("you can't delete", 'Close', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center' })
    } else {
      const dialogRef = this.dialog.open(MessageComponent);//top up dialog
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let _obj: deleteUserAcc = {
            email: User.email
          }
          this.userService.ProceedDeleteUserAcc(_obj).subscribe(items => {
            this.toastr.success('User Deleted', 'User Deleted successfully');
            this.fetchUserAccounts();
          }, error => {
            this.toastr.error('Error deleting user', error.error.message);
            console.error('Error deleting user:', error.error.message);
          })
        }
      });
    }
  }
  //approve tempary accounts of new registerd
  onApprove(tempUser: any): void {

    let _obj: approveTempAcc = {
      email: tempUser.email
    }
    this.userService.ProceedApproveTemAcc(_obj).subscribe(items => {
      this.toastr.success('mail is sent', 'User approved successfully');
      this.fetchTempUsers(); // Refresh the user list after approved
    }, error => {
      this.toastr.error('Error approving user', error);
      console.error('Error approving user', error);
    })
  }

  //admin direct register the company through the site
  onCompanyRegister() {
    this.dialog.open(UserRegComponent)
    // this.fetchUserAccounts();
  }

  //on company edit
  onUserEdit(user: any) {
    if (user.userRole == 'admin') {
      this.snackBar.open("you can't edit", 'Close', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'center' })
    } else {
      this.dialog.open(EditUserComponent, { data: user });
    }
  }

  //deleting user when approval view
  onTempDelete(tempUser: any): void {
    const dialogRef = this.dialog.open(MessageComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {


        let _obj: deleteTempAcc = {
          email: tempUser.email
        }
        this.userService.ProceedDeleteTemAcc(_obj).subscribe(items => {
          this.toastr.success('deleted', 'User deleted successfully');
          this.fetchTempUsers(); // Refresh the user list after deletion
        }, error => {
          this.toastr.error('Error deleting user:', error);
          console.error('Error deleting user:', error);
        })
      }
    });
  }

  //display colums
  displayedColumns: string[] = [
    'index',
    'company',
    'contact',
    'email',
    'address',
    'city',
    'companyurl',
    'userRole',
    'actions'
  ];

  //switching user table to temp account table
  toggleTable(): void {
    this.showTable = !this.showTable; // Toggle table visibility
    if (this.showTable) {
      this.activTable = false;
      // Fetch temp users data here if needed when the table is shown
      this.fetchTempUsers();
    } else {
      this.activTable = true;
    }
  }

  //fetching temp user accounts
  fetchTempUsers(): void {
    this.userService.ProceedTempUsers().subscribe({
      next: users => {
        this.tempUsers = users
      },
      error: (error: any) => {
        console.error('Error fetching temp users:', error);
      }
    });
  }

  //fetching all users approved

  fetchUserAccounts(): void {
    this.userService.ProceedApprovedUsers().subscribe({
      next: users => {
        this.SearchText
        this.userAccounts = users
      },
      error: (error: any) => {
        console.error('Error fetching user accounts:', error);
      }
    });
  }
  //export pdf
  public openPDF(): void {
    let DATA: any = document.getElementById('pdfTable');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('users.pdf');
    });
  }

  // export file
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
