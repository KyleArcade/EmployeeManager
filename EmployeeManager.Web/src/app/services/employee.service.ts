import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl = 'http://localhost:5063/employees/search';

    constructor(private http: HttpClient) { }

    searchEmployees(name: string): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}?name=${name}`);
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`http://localhost:5063/employees/${id}`);
    }
}
