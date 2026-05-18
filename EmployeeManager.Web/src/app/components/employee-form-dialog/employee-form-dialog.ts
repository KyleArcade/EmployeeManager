import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-form-dialog.html',
  styleUrl: './employee-form-dialog.css',
})
export class EmployeeFormDialog {
  employeeForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeFormDialog>
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'change' // <-- Forces real-time validation checks
      }],
      lastName: ['', {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'change'
      }],
      jobTitle: ['', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'change'
      }],
      phone: ['', {
        validators: [Validators.required, Validators.minLength(10)],
        updateOn: 'change'
      }],
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: (createdEmployee) => {
          this.isSubmitting = false;
          this.dialogRef.close(createdEmployee); // Pass back the new employee to add to the grid
        },
        error: (err) => {
          console.error('Failed to create employee', err);
          this.isSubmitting = false;
          alert('An error occurred while creating the employee.');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close window without making changes
  }
}
