import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewListningsComponent } from './components/joblistnings/components/view-listnings/view-listnings.component';
import { JoblistningsComponent } from './components/joblistnings/joblistnings.component';
import { PostProfileComponent } from './components/jobpost/components/post-profile/post-profile.component';
import { JobpostComponent } from './components/jobpost/jobpost.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'joblistnings',
    component: JoblistningsComponent,
    children: [
      { path: 'view-listning', component: ViewListningsComponent },
    ],
  },
  {
    path: 'jobpost',
    component: JobpostComponent,
    children: [
      { path: 'post-profile', component: PostProfileComponent },
    ],
  },
  { path: 'schedule', component: ScheduleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
