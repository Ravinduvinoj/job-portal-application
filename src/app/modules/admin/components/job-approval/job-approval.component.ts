import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ApiService } from '../../../../services/api-service/api.service';
import { StorageService } from '../../../../services/Storage/storage.service';

@Component({
  selector: 'app-job-approval',
  templateUrl: './job-approval.component.html',
  styleUrl: './job-approval.component.css'
})
export class JobApprovalComponent implements OnInit{
  posts!: any[];
  onShow: boolean = true;

  constructor(
    private apiServe:ApiService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    // getting addvertiesment data form approval service
    this.apiServe.processedGetJobAd().subscribe(items => {
      this.posts = items?.data;
    })
  }

  onAddEdit(_t16: any) {}
  //send data to jobapproval to selected row data
  onShowMore(post: any): void {
    this.storage.setJobData(post);
    this.router.navigate(['/admin/jobapproval/post-profile']); // navigating to profile
  }

  isPostProfileRoute(): boolean {
    return this.router.url === '/admin/jobapproval/post-profile';  // checking already stay in this route
  }

  view_pending():void{
    this.router.navigate(['/admin/jobapproval/pending']);// navigating to pending route
  }

  ispendingRoute(): boolean {
    return this.router.url === '/admin/jobapproval/pending';  // checking already stay in this route
  }

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
}
