import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserApiServiceService } from '../user-api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-status',
  imports: [CommonModule],
  templateUrl: './view-status.component.html',
  styleUrl: './view-status.component.css'
})
export class ViewStatusComponent {
 userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  Request: any[] = [];
constructor(private fb: FormBuilder, private loginService: UserApiServiceService) {}
ngOnInit() {
    this.loadRequests();
    
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorType) ?? false;
  }
  loadRequests() {
    if (typeof window !== 'undefined') {
  const employeeId = localStorage.getItem('employeeId');
  const parsedId = employeeId? parseInt(employeeId,10) : null;
    this.loginService.getRequests().subscribe({
      next: (requests) => {
        console.log('Fetched Requests:', requests); 
        this.Request = requests.filter(requests => requests.EmployeeId === parsedId);
        // this.Request = requests;
      },
      error: () => {
        this.errormessage = 'Failed to load Requests.';
      }
    });
  }
}
}
