import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './modules/components/sidebar/sidebar.component';
import { HeaderComponent } from './modules/components/header/header.component';
import { BodyComponent } from './modules/components/body/body.component';
import { NotFoundComponent } from './modules/components/not-found/not-found.component';
import { AdminComponent } from './modules/admin/admin.component';
import { CompanyComponent } from './modules/company/company.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './modules/company/components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { CategoryComponent } from './modules/admin/components/category/category.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrModule } from 'ngx-toastr';
import { JoblistningsComponent } from './modules/company/components/joblistnings/joblistnings.component';
import { JobpostComponent } from './modules/company/components/jobpost/jobpost.component';
import { ScheduleComponent } from './modules/company/components/schedule/schedule.component';
import { AccountsComponent } from './modules/admin/components/accounts/accounts.component';
import { JCategoryComponent } from './modules/admin/components/j-category/j-category.component';
import { JobApprovalComponent } from './modules/admin/components/job-approval/job-approval.component';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    BodyComponent,
    NotFoundComponent,
    AdminComponent,
    CompanyComponent,
    AdminDashboardComponent,
    DashboardComponent,
    CategoryComponent,
    JoblistningsComponent,
    JobpostComponent,
    ScheduleComponent,
    AccountsComponent,
    JCategoryComponent,
    JobApprovalComponent,
    NavbarComponent,
    RegisterComponent,
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
