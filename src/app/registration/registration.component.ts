import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserApiServiceService } from '../user-api-service.service';

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
  Department: { id: number; name: string }[] = [];
  User: { id: number; name: string }[] = [];

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
        departmentId: Number(values.departmentId),
        managerId: Number(values.userId)
      };

      const login = {
        username: values.username,
        password: values.password,
        role: values.role,
        userId: 0
      };
      console.log('Raw form value:', this.registrationForm.value);
      console.log('Sending employee:', employee);

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
