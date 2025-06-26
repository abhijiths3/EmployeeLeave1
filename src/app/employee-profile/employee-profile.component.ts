import { Component } from '@angular/core';
import { UserApiServiceService } from '../user-api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {
  errormessage: string = '';
  isLoading = false;
  User: any = null; 
  userForm!: FormGroup;
constructor(private fb: FormBuilder, private loginService: UserApiServiceService ) {}
ngOnInit() {
    this.loadProfile();
    this.userForm =this.fb.group({
      EmployeeName:[''],
      Age: [''],
    Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
    });
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
showForm = false;

toggleForm() {
  this.showForm = !this.showForm;
}
editProfile(){
  const employeeId = localStorage.getItem('employeeId');
  const Id = employeeId? parseInt(employeeId,10) : 0;
  console.log('Id :',Id);
const data = {
  id: Id,
  EmployeeName: this.userForm.value.EmployeeName,
  Age: Number(this.userForm.value.Age),
  Email: this.userForm.value.Email,
  Phone: this.userForm.value.Phone
};


  console.log('Submitting form:', this.userForm.value);

  this.loginService.editProfile(Id,data).subscribe({
    next: () => {
    alert('Profile edited Successfully');
    this.loadProfile();
    this.userForm.reset();
    this.showForm =false;
    },
    error: (err: any) => {
      console.error('Error on Editing:', err);
      this.errormessage = 'Failed to edit profile';
    }
  })
}
}