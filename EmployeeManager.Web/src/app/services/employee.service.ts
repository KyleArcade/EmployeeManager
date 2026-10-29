import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
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
    private searchRequest = signal<{ name: string } | undefined>(undefined);
    private http = inject(HttpClient);

    readonly searchResults = rxResource({
        params: () => this.searchRequest(),
        stream: ({ params }) => this.http.get<Employee[]>(this.apiUrl, {
            params: { name: params.name }
        })
    });

    searchEmployees(name: string): void {
        this.searchRequest.set({ name });
    }

    clearSearch(): void {
        this.searchRequest.set(undefined);
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`http://localhost:5063/employees/${id}`);
    }

    createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
        return this.http.post<Employee>('http://localhost:5063/employees', employee);
    }
}
