import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-employee',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
    employee: any = {};
    errorMessage = '';

    constructor(private employeeService: EmployeeService, private router: Router) { }

    addEmployee(): void {
        this.employeeService.addEmployee(this.employee).subscribe({
            next: (response) => {
                console.log('Employee added successfully', response);
                this.router.navigate(['/employees']);
            },
            error: (error) => {
                console.error('Error adding employee', error);
                this.errorMessage = 'Failed to add employee';
            },
        });
    }

    cancel(): void {
        this.router.navigate(['/employees']);
    }
}