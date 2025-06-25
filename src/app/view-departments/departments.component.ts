import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserApiServiceService } from '../user-api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departments',
  imports: [CommonModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  Department: any[] = [];
constructor(private fb: FormBuilder, private loginService: UserApiServiceService) {}
  ngOnInit() {
    this.loadDepartments();
    
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorType) ?? false;
  }

// Handling both plain array and WCF-style $values response
loadDepartments() {
  this.loginService.getDepartment().subscribe({
    next: (response: any) => {
      const departments = Array.isArray(response)
        ? response
        : response?.$values || [];

      this.Department = departments.map((d: any) => ({
        ...d,
        id: Number(d.departmentId || d.id),       
        departmentName: d.departmentName || d.DepartmentName 
      }));

      console.log('Loaded Departments:', this.Department);
    },
    error: (err) => {
      this.errormessage = 'Failed to load departments.';
      console.error('Error loading departments:', err);
    }
  });
}

  // loadDepartments() {
  //   this.loginService.getDepartment().subscribe({
      
  //     next: (departments) => {
  //       console.log('Fetched Departments:', departments); 
  //       this.Department = departments;
  //     },
  //     error: () => {
  //       this.errormessage = 'Failed to load departments.';
  //     }
  //   });
  // }
}
