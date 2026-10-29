import { Component, ViewChild, ElementRef, Output, EventEmitter, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule, MatAutocompleteTrigger, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../services/employee.service';

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

  readonly searchTerm = signal('');
  readonly employees = computed(() => {
    const results = this.employeeService.searchResults;
    return results.hasValue() ? results.value() : [];
  });
  private readonly trimmedSearchTerm = computed(() => this.searchTerm().trim());
  readonly hasSearched = computed(() => this.employeeService.searchResults.status() === 'resolved');
  readonly isSearchDisabled = computed(() => this.trimmedSearchTerm().length < 2);
  readonly showNoResults = computed(() =>
    this.employees().length === 0 &&
    this.trimmedSearchTerm().length >= 2 &&
    this.hasSearched()
  );
  readonly showMinimumLengthHint = computed(() =>
    this.trimmedSearchTerm().length > 0 && this.trimmedSearchTerm().length < 2
  );
  private pendingTrigger?: MatAutocompleteTrigger;

  constructor(private employeeService: EmployeeService) {
    effect(() => {
      const searchResults = this.employeeService.searchResults;
      const status = searchResults.status();

      if (status === 'error') {
        this.pendingTrigger = undefined;
        console.error('Error fetching employees', searchResults.error());
      }

      if (status === 'resolved' && this.pendingTrigger) {
        const trigger = this.pendingTrigger;
        this.pendingTrigger = undefined;
        setTimeout(() => {
          this.searchInput.nativeElement.focus();
          trigger.openPanel();
        });
      }
    });
  }

  onSearch(trigger: MatAutocompleteTrigger): void {
    if (!this.searchTerm().trim()) {
      this.pendingTrigger = undefined;
      this.employeeService.clearSearch();
      return;
    }

    if (this.isSearchDisabled()) {
      alert('Please enter at least 2 characters to search.');
      return;
    }

    this.pendingTrigger = trigger;
    this.employeeService.searchEmployees(this.searchTerm());
  }

  onEnterKey(trigger: MatAutocompleteTrigger): void {
    if (!this.isSearchDisabled()) {
      this.onSearch(trigger);
    }
  }

  onSearchTermChange(value: string): void {
    this.searchTerm.set(value);
    if (this.isSearchDisabled()) {
      this.pendingTrigger = undefined;
      this.employeeService.clearSearch();
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedName = event.option.value;
    
    const foundEmployee = this.employees().find(e => `${e.firstName} ${e.lastName}` === selectedName);
    
    if (foundEmployee) {
      this.employeeSelected.emit(foundEmployee.id);
      this.searchTerm.set('');
      this.pendingTrigger = undefined;
      this.employeeService.clearSearch();
    }
  }
}
