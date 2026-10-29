import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../services/employee.service';
import { map } from 'rxjs';

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
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly employees = input<Employee[]>([]);
  readonly hasEmployees = computed(() => this.employees().length > 0);
  readonly columns = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
      map(({ breakpoints }) =>
        breakpoints[Breakpoints.XSmall] ? 1 : breakpoints[Breakpoints.Small] ? 2 : 3
      )
    ),
    { initialValue: 3 }
  );

  readonly removeClicked = output<number>();

  onRemove(id: number): void {
    const employee = this.employees().find(emp => emp.id === id);
    if (employee) {
      this.removeClicked.emit(employee.id);
    }
  }
}
