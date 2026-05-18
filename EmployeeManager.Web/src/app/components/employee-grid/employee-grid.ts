import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './employee-grid.html',
  styleUrls: [`./employee-grid.css`],
})
export class EmployeeGrid {
  @Input() employees: Employee[] = [];

  @Output() removeClicked = new EventEmitter<number>();

  onRemove(id: number): void {
    const employee = this.employees.find(emp => emp.id === id);
    if (employee) {
      this.removeClicked.emit(employee.id);
    }
  }
}
