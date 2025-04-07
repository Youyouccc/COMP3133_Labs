import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
    { path: 'update-employee/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' },
];