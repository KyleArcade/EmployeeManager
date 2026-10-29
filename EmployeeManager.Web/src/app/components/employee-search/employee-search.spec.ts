import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { EmployeeSearchComponent } from './employee-search';

describe('EmployeeSearch', () => {
  let component: EmployeeSearchComponent;
  let fixture: ComponentFixture<EmployeeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when Enter is pressed and search is enabled', () => {
    const trigger = {} as MatAutocompleteTrigger;
    const searchSpy = vi.spyOn(component, 'onSearch');
    component.onSearchTermChange('Ada');

    component.onEnterKey(trigger);

    expect(searchSpy).toHaveBeenCalledWith(trigger);
  });

  it('should not search when Enter is pressed and search is disabled', () => {
    const trigger = {} as MatAutocompleteTrigger;
    const searchSpy = vi.spyOn(component, 'onSearch');
    component.onSearchTermChange('A');

    component.onEnterKey(trigger);

    expect(searchSpy).not.toHaveBeenCalled();
  });
});
