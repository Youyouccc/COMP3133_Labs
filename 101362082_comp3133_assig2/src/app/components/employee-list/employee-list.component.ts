import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
    employees$!: Observable<any[]>;

    constructor(private employeeService: EmployeeService, private router: Router) { }

    ngOnInit(): void {
        this.employees$ = this.employeeService.getEmployees();
    }

    deleteEmployee(id: string): void {
        this.employeeService.deleteEmployee(id).subscribe(() => {
            this.employees$ = this.employeeService.getEmployees();
        });
    }

    viewEmployee(id: string): void {
        this.router.navigate(['/employee', id]);
    }

    updateEmployee(id: string): void {
        this.router.navigate(['/update-employee', id]);
    }
}