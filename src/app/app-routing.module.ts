import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component'
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


import { AuthGuard } from '././service/auth.guard';


const routes: Routes = [
  {path: '',   redirectTo: 'employee-list', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: 'employee-edit', component: EmployeeEditComponent, canActivate: [AuthGuard] },
  { path: 'employee-detail', component: EmployeeDetailComponent, canActivate: [AuthGuard] }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
