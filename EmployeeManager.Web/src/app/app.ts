import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeSearchComponent } from './components/employee-search/employee-search';
import { Employee } from './services/employee.service';

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

  addEmployeeToGrid(employee: Employee): void {
    // Prevent adding the exact same employee twice.
    const exists = this.selectedEmployees.some(e => e.id === employee.id);
    
    if (!exists) {
      this.selectedEmployees.push(employee);
    }
  }

  removeEmployeeFromGrid(employeeToRemove: Employee): void {
    this.selectedEmployees = this.selectedEmployees.filter(
      emp => !(emp.firstName === employeeToRemove.firstName && emp.lastName === employeeToRemove.lastName)
    );
  }
}
