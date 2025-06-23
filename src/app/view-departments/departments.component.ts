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
loadDepartments() {
  this.loginService.getDepartment().subscribe({
    next: (response: any) => {
      // Handle both plain array and WCF-style $values response
      const departments = Array.isArray(response)
        ? response
        : response?.$values || [];

      this.Department = departments.map((d: any) => ({
        ...d,
        id: Number(d.departmentId || d.id),         // Use correct ID field
        departmentName: d.departmentName || d.DepartmentName // Allow for case variations
      }));

      console.log('Loaded Departments:', this.Department);
    },
    error: (err) => {
      this.errormessage = 'Failed to load departments.';
      console.error('Error loading departments:', err);
    }
  });
}

}
