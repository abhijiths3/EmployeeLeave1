import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserApiServiceService } from '../user-api-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-leave-requests',
  imports: [CommonModule],
  templateUrl: './view-leave-requests.component.html',
  styleUrl: './view-leave-requests.component.css'
})
export class ViewLeaveRequestsComponent {
userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  Request: any[] = [];
constructor(private fb: FormBuilder, private loginService: UserApiServiceService, private http : HttpClient) {}
  ngOnInit() {
    this.loadRequests();
    
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorType) ?? false;
  }
  loadRequests() {
    this.loginService.getRequests().subscribe({
      
      next: (request) => {
        console.log('Fetched Requests:', request); 
        this.Request = request;
      },
      error: () => {
        this.errormessage = 'Failed to load departments.';
      }
    });
  }
  
handleDecision(request: any, action: 'accept' | 'reject') {
  const status = action === 'accept' ? 'Approved' : 'Rejected';

  const requestId = request.Id; // Use the correct property name from your model

  if (!requestId) {
    console.error('Request ID not found:', request);
    this.errormessage = 'Invalid leave request: ID is missing.';
    return;
  }

  this.loginService.acceptOrRejectRequest(requestId, status).subscribe({
    next: () => {
      alert(`Request has been ${status.toLowerCase()}.`);
      this.loadRequests(); // 🔄 Refresh the table
    },
    error: (err) => {
      console.error('Error while updating request:', err);
      this.errormessage = `Failed to ${action} the leave request.`;
    }
  });
}




}
