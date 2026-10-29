import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGrid } from './employee-grid';
import { Employee } from '../../services/employee.service';

describe('EmployeeGrid', () => {
  let component: EmployeeGrid;
  let fixture: ComponentFixture<EmployeeGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the id when an existing employee is removed', () => {
    const employee: Employee = {
      id: 1,
      firstName: 'Ada',
      lastName: 'Lovelace'
    };
    const removedIds: number[] = [];
    fixture.componentRef.setInput('employees', [employee]);
    component.removeClicked.subscribe(id => removedIds.push(id));

    component.onRemove(employee.id);

    expect(removedIds).toEqual([employee.id]);
  });
});
