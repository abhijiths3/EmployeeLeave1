// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { UserApiServiceService } from '../user-api-service.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent {
//   registrationForm: FormGroup;
//   formSubmitted = false;
//   Department: any[] = [];
//   User: any[] = [];

//   selectedDeptId: number | null = null;
//   selectedUserId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private employeeService: UserApiServiceService,
//     private router: Router
//   ) {
//     this.registrationForm = this.fb.group({
//       employeeName: ['', Validators.required],
//       age: [null, [Validators.required, Validators.min(18)]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       departmentId: [null, Validators.required],
//       userId: [null, Validators.required],
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       role: ['Employee', Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.loadDepartments();
//     this.loadUsers();
//   }

//   loadDepartments() {
//     this.employeeService.getDepartment().subscribe({
//       next: (departments) => {
//         console.log('✅ Departments received:', departments);
//         this.Department = departments.map(d => ({
//           ...d,
//           id: Number(d.departmentId || d.id) // Adjust depending on your API response
//         }));
//       },
//       error: () => console.error('❌ Failed to load departments')
//     });
//   }

//   loadUsers() {
//     this.employeeService.getUser().subscribe({
//       next: (users) => {
//         console.log('✅ Users received:', users);
//         this.User = users.map(u => ({
//           ...u,
//           id: Number(u.userId || u.id) // Adjust depending on your API response
//         }));
//       },
//       error: () => console.error('❌ Failed to load users')
//     });
//   }

//   onDepartmentChange(event: any) {
//     this.selectedDeptId = Number(event.target.value);
//   }

//   onUserChange(event: any) {
//     this.selectedUserId = Number(event.target.value);
//   }

//   onSubmit() {
//     this.formSubmitted = true;

//     if (this.registrationForm.valid) {
//       const formValues = this.registrationForm.value;

//       const employeeData = {
//         employeeName: formValues.employeeName,
//         age: formValues.age,
//         email: formValues.email,
//         phone: formValues.phone,
//         departmentId: formValues.departmentId ?? null,
//         managerId: formValues.userId ?? null
//       };

//       const loginData = {
//         username: formValues.username,
//         password: formValues.password,
//         role: formValues.role,
//         userId: 0
//       };

//       console.log('📤 Submitting employee data:', employeeData);

//       this.employeeService.registerEmployee(employeeData).subscribe({
//         next: (response) => {
//           loginData.userId = response.id || response.userId;
//           this.employeeService.createLogin(loginData).subscribe({
//             next: () => {
//               alert('Registration successful!');
//               this.registrationForm.reset();
//               this.formSubmitted = false;
//               this.router.navigate(['/login']);
//             },
//             error: () => alert('Login creation failed.')
//           });
//         },
//         error: (err) => {
//           console.error('❌ Registration failed:', err);
//           alert('Something went wrong during registration.');
//         }
//       });
//     }
//   }

//   hasError(field: string, type: string): boolean {
//     const control = this.registrationForm.get(field);
//     return !!(control?.hasError(type) && (this.formSubmitted || control?.touched));
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserApiServiceService } from '../user-api-service.service';
 // adjust path if needed

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  formSubmitted = false;
  Department: any[] = [];
  User: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: UserApiServiceService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      employeeName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      departmentId: [null, Validators.required],
      userId: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['Employee', Validators.required]
    });
  }

  ngOnInit() {
    this.getDepartments();
    this.getUsers();
  }

  getDepartments() {
    this.service.getDepartment().subscribe({
      next: (res: any) => {
        const depts = Array.isArray(res) ? res : res?.$values || [];
        this.Department = depts.map((d: any) => ({
          id: Number(d.departmentId || d.id),
          name: d.departmentName || d.DepartmentName
        }));
      },
      error: () => console.error('Failed to load departments')
    });
  }

  getUsers() {
    this.service.getUser().subscribe({
      next: (res: any) => {
        const users = Array.isArray(res) ? res : res?.$values || [];
        this.User = users.map((u: any) => ({
          id: Number(u.userId || u.id),
          name: u.employeeName || u.EmployeeName
        }));
      },
      error: () => console.error('Failed to load users')
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.registrationForm.valid) {
      const values = this.registrationForm.value;

      const employee = {
        employeeName: values.employeeName,
        age: values.age,
        email: values.email,
        phone: values.phone,
        departmentId: values.departmentId,
        managerId: values.userId
      };

      const login = {
        username: values.username,
        password: values.password,
        role: values.role,
        userId: 0
      };

      this.service.registerEmployee(employee).subscribe({
        next: (res: any) => {
          login.userId = res.id || res.userId;
          this.service.createLogin(login).subscribe({
            next: () => {
              alert('Registration successful!');
              this.registrationForm.reset();
              this.formSubmitted = false;
              this.router.navigate(['/login']);
            },
            error: () => alert('Login creation failed.')
          });
        },
        error: () => alert('Employee registration failed.')
      });
    }
  }

  hasError(field: string, type: string): boolean {
    const control = this.registrationForm.get(field);
    return !!(control?.hasError(type) && (this.formSubmitted || control?.touched));
  }
}
