import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './modules/components/not-found/not-found.component';
import { authGuard } from './_guard/auth.guard';
import { AdminComponent } from './modules/admin/admin.component';
import { CompanyComponent } from './modules/company/company.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Lazy load the admin module
  {
    path: 'admin', component: AdminComponent,
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },

  // Lazy load the company module
  {
    path: 'company', component: CompanyComponent,
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
    canActivate: [authGuard],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
