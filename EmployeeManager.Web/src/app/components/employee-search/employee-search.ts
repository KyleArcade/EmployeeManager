import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule
  ],
  templateUrl: './employee-search.html',
  styleUrls: ['./employee-search.css']
})
export class EmployeeSearchComponent {
  @Output() employeeSelected = new EventEmitter<number>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm: string = '';
  employees: Employee[] = [];
  hasSearched: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  onSearch(trigger: MatAutocompleteTrigger): void {
    if (!this.searchTerm.trim()) {
      this.employees = [];
      this.hasSearched = false;
      return;
    }

    if (this.searchTerm.trim().length < 2) {
    alert('Please enter at least 2 characters to search.');
    return;
  }

    this.employeeService.searchEmployees(this.searchTerm).subscribe({
      next: (data) => {
        this.employees = data;
        this.hasSearched = true;
        setTimeout(() => {
          this.searchInput.nativeElement.focus();
          trigger.openPanel();
        });
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.hasSearched = false;
      }
    });
  }

  onInputChange(): void {
    if (this.searchTerm.trim().length < 2) {
      this.employees = [];
      this.hasSearched = false;
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;
    
    const foundEmployee = this.employees.find(e => `${e.firstName} ${e.lastName}` === selectedName);
    
    if (foundEmployee) {
      this.employeeSelected.emit(foundEmployee.id);
      this.searchTerm = '';
      this.hasSearched = false;
      this.employees = [];
    }
  }
}
