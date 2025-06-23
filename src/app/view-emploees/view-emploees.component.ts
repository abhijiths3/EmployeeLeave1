import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserApiServiceService } from '../user-api-service.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-view-emploees',
  imports: [CommonModule,RouterModule],
  templateUrl: './view-emploees.component.html',
  styleUrl: './view-emploees.component.css'
})
export class ViewEmploeesComponent {

  userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  User: any[] = [];

constructor(private fb: FormBuilder, private loginService: UserApiServiceService) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loadUsers();
    
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorType) ?? false;
  }
  // loadUsers() {
  //   this.loginService.getUser().subscribe({
      
  //     next: (users) => {
  //       console.log('Fetched users:', users); 
  //       this.User = users;
  //     },
  //     error: () => {
  //       this.errormessage = 'Failed to load users.';
  //     }
  //   });
  // }
  loadUsers() {
  this.loginService.getUser().subscribe({
    next: (response: any) => {
      console.log('Fetched raw users:', response);

      const users = Array.isArray(response) ? response : response?.$values || [];

     this.User = users.map((u: any) => ({
  EmployeeName: u.employeeName || u.EmployeeName,
  Email: u.email || u.Email,
  DepartmentName: u.departmentName || u.DepartmentName
}));

    },
    error: () => {
      this.errormessage = 'Failed to load users.';
    }
  });
}

}
