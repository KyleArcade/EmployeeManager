import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  readonly isSubmitting = signal(false);
  readonly canSubmit = computed(() => {
    this.formStateVersion();
    return !this.employeeForm.invalid && !this.isSubmitting();
  });
  readonly submitButtonText = computed(() => this.isSubmitting() ? 'Creating...' : 'Create');

  readonly showFirstNameRequired = computed(() => this.hasError('firstName', 'required', true));
  readonly showFirstNameMinLength = computed(() => this.hasError('firstName', 'minlength'));
  readonly showLastNameRequired = computed(() => this.hasError('lastName', 'required', true));
  readonly showLastNameMinLength = computed(() => this.hasError('lastName', 'minlength'));
  readonly showJobTitleRequired = computed(() => this.hasError('jobTitle', 'required', true));
  readonly showJobTitleMinLength = computed(() => this.hasError('jobTitle', 'minlength'));
  readonly showPhoneRequired = computed(() => this.hasError('phone', 'required', true));
  readonly showPhoneMinLength = computed(() => this.hasError('phone', 'minlength'));
  readonly showEmailRequired = computed(() => this.hasError('email', 'required', true));
  readonly showEmailInvalid = computed(() => this.hasError('email', 'email', true));

  private readonly formStateVersion = signal(0);
  private readonly destroyRef = inject(DestroyRef);

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

    this.employeeForm.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.formStateVersion.update(version => version + 1));
  }

  onSubmit(): void {
    if (this.canSubmit()) {
      this.isSubmitting.set(true);

      this.employeeService.createEmployee(this.employeeForm.value).subscribe({
        next: (createdEmployee) => {
          this.isSubmitting.set(false);
          this.dialogRef.close(createdEmployee); // Pass back the new employee to add to the grid
        },
        error: (err) => {
          console.error('Failed to create employee', err);
          this.isSubmitting.set(false);
          alert('An error occurred while creating the employee.');
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close window without making changes
  }

  private hasError(controlName: string, errorCode: string, requireTouched = false): boolean {
    this.formStateVersion();
    const control = this.employeeForm.get(controlName);
    return !!control?.hasError(errorCode) && (!requireTouched || !!control.touched);
  }
}
