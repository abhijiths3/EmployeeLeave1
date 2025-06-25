import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserApiServiceService } from '../user-api-service.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.css'
})
export class ApplyLeaveComponent {
leaveForm: FormGroup;
  submitted = false;
  Type: any[] = [];
  constructor( private snackBar: MatSnackBar, private fb: FormBuilder, private service: UserApiServiceService) {
    const idFromStorage = localStorage.getItem('employeeId');
    const parsedId = idFromStorage ? parseInt(idFromStorage, 10) : null;

    this.leaveForm = this.fb.group({
      employeeId: [parsedId, Validators.required],
      typeId: [null, Validators.required],
      reason: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  
ngOnInit() {
  this.loadTypes();
}

  onSubmit() {
    this.submitted = true;
    if (this.leaveForm.valid) {
      console.log("Values entererd:",this.leaveForm.value);
      this.service.submitLeave(this.leaveForm.value).subscribe({
        next: () => {
           this.snackBar.open('Leave request submitted!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.leaveForm.reset();
          this.submitted = false;
        },
        error: () =>  this.snackBar.open('Failed to submit leave request!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
      });
    }
  }
 loadTypes() {
  this.service.getType().subscribe({
    next: (types) => {
      console.log('Fetched types:', types);
      this.Type = types;
    },
    error: (err) => {
      console.error('Failed to load leave types', err);
     
    }
  });
}

  hasError(field: string, error: string) {
    const ctrl = this.leaveForm.get(field);
    return ctrl?.hasError(error) && (ctrl?.touched || this.submitted);
  }
}
