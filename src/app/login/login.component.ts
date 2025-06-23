import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserApiServiceService } from '../user-api-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  User: any[] = [];

  constructor(
    private fb: FormBuilder,
    private loginService: UserApiServiceService,
    private router: Router
  ) {}

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

  login() {
    console.log("Form submitted:", this.userForm.value);
    if (this.userForm.valid) {
      this.isLoading = true;
      this.loginService.authenticate(this.userForm.value).subscribe({
        next: (res: { message: string; role?: string }) => {
          console.log('Login successful:', res.message);
          this.isLoading = false;

          if (res.role === 'Admin') {
            this.router.navigate(['/admindash']);
          } else {
            this.errormessage = 'Access denied: Not an admin.';
          }
        },
        error: (err: any) => {
          this.errormessage = 'Login failed. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  loadUsers() {
    this.loginService.getUser().subscribe({
      next: (users) => {
        this.User = users;
      },
      error: () => {
        this.errormessage = 'Failed to load users.';
      }
    });
  }
}
