import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { JCategoryComponent } from './modules/admin/components/j-category/j-category.component';
import { AccountsComponent } from './modules/admin/components/accounts/accounts.component';
import { CompanyComponent } from './modules/company/company.component';
import { DashboardComponent } from './modules/company/components/dashboard/dashboard.component';
import { JoblistningsComponent } from './modules/company/components/joblistnings/joblistnings.component';
import { JobpostComponent } from './modules/company/components/jobpost/jobpost.component';
import { ScheduleComponent } from './modules/company/components/schedule/schedule.component';
import { NotFoundComponent } from './modules/components/not-found/not-found.component';
import { authGuard } from './_guard/auth.guard';
import { JobApprovalComponent } from './modules/admin/components/job-approval/job-approval.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin', component: AdminComponent,canActivate:[authGuard], children: [
      { path: '', redirectTo: '/admin/admin-dashboard', pathMatch: 'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent ,canActivate:[authGuard]},
      { path: 'j-category', component: JCategoryComponent,canActivate:[authGuard] },
      { path: 'accounts', component: AccountsComponent,canActivate:[authGuard] },
       {
         path: 'jobapproval', component: JobApprovalComponent,
          // children: [
      //     { path: "post-profile", component: ApprovalProfileComponent },
      //     { path: "pending", component: PendingBoxComponent }

      //   ]
      },
      // { path: 'subscription', component: SubscriptionComponent },

    ]
  },
  {
    path: 'company', component: CompanyComponent,canActivate:[authGuard], children: [
      { path: '', redirectTo: '/company/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
      { path: 'joblistnings', component: JoblistningsComponent,canActivate:[authGuard],
      //   children:[
      //   {path:'view-listning',component:ViewListningsComponent}
      // ] 
    },
      {
        path: 'jobpost', component: JobpostComponent,canActivate:[authGuard], 
        // children: [
        //   { path: 'post-profile', component: PostProfileComponent },
        // ]
      },
      { path: 'schedule', component: ScheduleComponent ,canActivate:[authGuard]},
      // { path: 'plans', component: PlanComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
