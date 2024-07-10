import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    
    BodyComponent,
    NotFoundComponent,
    AdminComponent,
    CompanyComponent,
    AdminDashboardComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule

    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
