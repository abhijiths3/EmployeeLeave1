import { Component } from '@angular/core';
import { LoginComponent, } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ViewEmploeesComponent } from './view-emploees/view-emploees.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeaveRequest';
}
