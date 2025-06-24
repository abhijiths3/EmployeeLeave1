import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserApiServiceService } from '../user-api-service.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private service: UserApiServiceService) {
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

  onSubmit() {
    this.submitted = true;
    if (this.leaveForm.valid) {
      this.service.submitLeave(this.leaveForm.value).subscribe({
        next: () => {
          alert('Leave request submitted!');
          this.leaveForm.reset();
          this.submitted = false;
        },
        error: () => alert('Failed to submit leave request.')
      });
    }
  }

  hasError(field: string, error: string) {
    const ctrl = this.leaveForm.get(field);
    return ctrl?.hasError(error) && (ctrl?.touched || this.submitted);
  }
}
