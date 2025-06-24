import { Component } from '@angular/core';
import { Router,RouterOutlet, RouterModule } from '@angular/router';
import { UserApiServiceService } from '../user-api-service.service';


@Component({
  selector: 'app-employee-home',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
constructor(private authService:UserApiServiceService, private router: Router){}
onLogout(){
  this.authService.logOut().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: () => {
      alert("Logout failed. Please try again..");
    }
  });
}
}
