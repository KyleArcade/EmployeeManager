import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeSearchComponent } from './components/employee-search/employee-search';
import { Employee, EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EmployeeSearchComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  addEmployeeToGrid(id: number): void {
    // Prevent adding the exact same employee twice.
    const exists = this.selectedEmployees.some(employee => employee.id === id);

    if (exists) return;
    
    this.employeeService.getEmployeeById(id).subscribe({
      next: (fullEmployeeProfile) => {
        this.selectedEmployees.push(fullEmployeeProfile);
      },
      error: (err) => console.error('Failed to fetch rich profile data', err)
    });
  }

  removeEmployeeFromGrid(id: number): void {
    this.selectedEmployees = this.selectedEmployees.filter(
      employee => employee.id !== id
    );
  }
}
