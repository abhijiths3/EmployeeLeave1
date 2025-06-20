import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { ViewEmploeesComponent } from './view-emploees/view-emploees.component';
import { LeaveTypesComponent } from './view-types/leave-types.component';
import { DepartmentsComponent } from './view-departments/departments.component';
import { ViewLeaveRequestsComponent } from './view-leave-requests/view-leave-requests.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    // {path: 'admindash', component:AdminDashBoardComponent}
      {
    path: 'admindash',
    component: AdminDashBoardComponent,
    children: [
      { path: 'employees', component: ViewEmploeesComponent },
      { path: 'types', component: LeaveTypesComponent},
      { path: 'departments', component: DepartmentsComponent},
      { path: 'requests',component:ViewLeaveRequestsComponent}

    ]
  }
];
