import { Component } from '@angular/core';
import { UserApiServiceService } from '../user-api-service.service';

@Component({
  selector: 'app-annual-reset',
  imports: [],
  templateUrl: './annual-reset.component.html',
  styleUrl: './annual-reset.component.css'
})
export class AnnualResetComponent {
 message = '';

  constructor(private leaveService: UserApiServiceService) {}

  resetLeave() {
    if (confirm("Are you sure you want to reset all employees' leave balances?")) {
      this.leaveService.anualReset().subscribe({
        next: () => this.message = 'Leave balances have been successfully reset.',
        error: err => this.message = 'Something went wrong. Please try again.'
      });
    } else {
      this.message = 'Operation cancelled.';
    }
  }
}
