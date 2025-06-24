import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { ViewEmploeesComponent } from './view-emploees/view-emploees.component';
import { LeaveTypesComponent } from './view-types/leave-types.component';
import { DepartmentsComponent } from './view-departments/departments.component';
import { ViewLeaveRequestsComponent } from './view-leave-requests/view-leave-requests.component';
import { AnnualResetComponent } from './annual-reset/annual-reset.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { AboutComponent } from './about/about.component';




export const routes: Routes = [
    // {path: '', component:LoginComponent},
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent },
{
  path: 'EmployeeHome',
  component: EmployeeHomeComponent,
  children: [
    { path: '', redirectTo: 'ApplyLeave', pathMatch: 'full' },
    { path: 'ApplyLeave', component: ApplyLeaveComponent },
    { path: 'ViewStatus', component: ViewStatusComponent },
    { path: 'profile', component:EmployeeProfileComponent },
    { path: 'about', component:AboutComponent },
  ]
},
      {
    path: 'admindash',
    component: AdminDashBoardComponent,
    children: [
      { path: 'employees', component: ViewEmploeesComponent },
      { path: 'types', component: LeaveTypesComponent},
      { path: 'departments', component: DepartmentsComponent},
      { path: 'requests',component:ViewLeaveRequestsComponent},
      { path: 'annualReset',component:AnnualResetComponent}
    ]
  }
];
