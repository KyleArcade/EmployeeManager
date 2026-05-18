import { Component, ChangeDetectorRef  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeSearchComponent } from './components/employee-search/employee-search';
import { EmployeeGrid } from './components/employee-grid/employee-grid';
import { Employee, EmployeeService } from './services/employee.service';
import { EmployeeFormDialog } from './components/employee-form-dialog/employee-form-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EmployeeSearchComponent,
    EmployeeGrid, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  addEmployeeToGrid(id: number): void {
    // Prevent adding the exact same employee twice.
    const exists = this.selectedEmployees.some(employee => employee.id === id);

    if (exists) return;
    
    this.employeeService.getEmployeeById(id).subscribe({
      next: (fullEmployeeProfile) => {
        this.selectedEmployees = [...this.selectedEmployees, fullEmployeeProfile];
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Failed to fetch rich profile data', err)
    });
  }

  removeEmployeeFromGrid(id: number): void {
    this.selectedEmployees = this.selectedEmployees.filter(
      employee => employee.id !== id
    );
    this.cdr.detectChanges();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormDialog, {
      width: '400px',
      disableClose: true // Prevents closing if the user accidentally clicks outside the modal
    });

    // Catch the newly created employee returned from the dialog closure
    dialogRef.afterClosed().subscribe((newEmployee: Employee) => {
      if (newEmployee) {
        this.selectedEmployees = [...this.selectedEmployees, newEmployee];
        this.cdr.detectChanges();
      }
    });
  }
}
