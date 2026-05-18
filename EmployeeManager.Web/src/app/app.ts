import { Component, ChangeDetectorRef  } from '@angular/core';
import { EmployeeSearchComponent } from './components/employee-search/employee-search';
import { EmployeeGrid } from './components/employee-grid/employee-grid';
import { Employee, EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EmployeeSearchComponent,
    EmployeeGrid],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
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
}
