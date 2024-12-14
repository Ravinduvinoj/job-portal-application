import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { JCategoryComponent } from './components/j-category/j-category.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { JobApprovalComponent } from './components/job-approval/job-approval.component';
import { ApprovalProfileComponent } from './components/job-approval/components/approval-profile/approval-profile.component';
import { PendingBoxComponent } from './components/job-approval/components/pending-box/pending-box.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'j-category', component: JCategoryComponent },
  { path: 'accounts', component: AccountsComponent },
  {
    path: 'jobapproval',
    component: JobApprovalComponent,
    children: [
      { path: 'post-profile', component: ApprovalProfileComponent },
      { path: 'pending', component: PendingBoxComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
