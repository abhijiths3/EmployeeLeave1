import { Component } from '@angular/core';
import { UserApiServiceService } from '../user-api-service.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {
  errormessage: string = '';
  isLoading = false;
  User: any = null; 
constructor( private loginService: UserApiServiceService ) {}
ngOnInit() {
    this.loadProfile();
    
  }
  loadProfile(){
     if (typeof window !== 'undefined') {
  const employeeId = localStorage.getItem('employeeId');
  const parsedId = employeeId? parseInt(employeeId,10) : 0;
  console.log(parsedId)
  this.loginService.getUserById(parsedId).subscribe({
      next: (users) => {
        console.log('Fetched user:', users); 
        this.User = users;
      },
      error: () => {
        this.errormessage = 'Failed to load Requests.';
      }
    });
     }
}
}