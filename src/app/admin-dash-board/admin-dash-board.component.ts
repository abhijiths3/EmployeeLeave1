import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserApiServiceService } from '../user-api-service.service';

@Component({
  standalone: true,
  selector: 'app-admin-dash-board',
  imports: [RouterModule],
  templateUrl: './admin-dash-board.component.html',
  styleUrl: './admin-dash-board.component.css'
})
export class AdminDashBoardComponent {
 constructor(private authService: UserApiServiceService, private router: Router) {}

  onLogout() {
    this.authService.logOut().subscribe({
      next: () => {
        // Optionally clear local storage or tokens
        this.router.navigate(['/login']); // Redirect to login or homepage
      },
      error: () => {
        alert("Logout failed. Please try again.");
      }
    });
  }
}
