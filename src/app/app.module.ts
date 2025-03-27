import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { appInjector } from './app.injector';
import { AuthGuard, AuthService, EmployeeService, GroupEmployeeService } from './service';
import { NavbarComponent } from './navbar/navbar.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { SearchDropdown } from './utility/search-dropdown/search-dropdown.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    NavbarComponent,
    EmployeeEditComponent,
    SearchDropdown,
    EmployeeDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyMaskModule,
    MatProgressSpinnerModule
  ],
  providers: [provideAnimationsAsync(), AuthGuard, AuthService, EmployeeService, GroupEmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    appInjector(injector);
  }
}
