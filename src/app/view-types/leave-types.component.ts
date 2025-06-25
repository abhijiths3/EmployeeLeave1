import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserApiServiceService } from '../user-api-service.service';

@Component({
  selector: 'app-leave-types',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule ],
  templateUrl: './leave-types.component.html',
  styleUrl: './leave-types.component.css'
})
export class LeaveTypesComponent {
  userForm!: FormGroup;
  errormessage: string = '';
  isLoading = false;
  Type: any[] = [];
constructor(private fb: FormBuilder, private loginService: UserApiServiceService) {}
ngOnInit(): void {
   this.loadTypes();
  this.userForm = this.fb.group({
    Type: [''],
    Description: ['']
  });
}

  hasError(controlName: string, errorType: string): boolean {
    return this.userForm.get(controlName)?.hasError(errorType) ?? false;
  }
  loadTypes() {
    this.loginService.getType().subscribe({
      
      next: (types) => {
        console.log('Fetched users:', types); 
        this.Type = types;
      },
      error: () => {
        this.errormessage = 'Failed to load types.';
      }
    });
  }
showForm = false;

toggleForm() {
  this.showForm = !this.showForm;
}

addLeaveType() {
 const data = this.userForm.value; 

console.log('Sending:', data);
console.log('Form values:', this.userForm.value);
console.log('Outgoing data:', {
  Type: this.userForm.value.typeName,
  Description: this.userForm.value.description
});

  this.loginService.addLeaveType(data).subscribe({
    next: () => {
      alert('Leave type added successfully!');
      this.loadTypes();
      this.userForm.reset();
      this.showForm = false;
    },
    error: (err) => {
      console.error('Error adding leave type:', err);
      this.errormessage = 'Failed to add leave type.';
    }
  });
}

}



