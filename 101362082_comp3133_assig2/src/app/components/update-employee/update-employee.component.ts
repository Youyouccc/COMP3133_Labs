import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators'; // Import switchMap

@Component({
    selector: 'app-update-employee',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './update-employee.component.html',
    styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
    employeeId!: string;
    employee$!: Observable<any>;
    employee: any = {};
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.employeeId = this.route.snapshot.params['id']; // Get ID from route

        this.employeeService.getEmployee(this.employeeId).subscribe(data => {
            this.employee = data;
        });
    }

    updateEmployee(): void {
        this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
            next: (response) => {
                console.log('Employee updated successfully', response);
                this.router.navigate(['/employees']);
            },
            error: (error) => {
                console.error('Error updating employee', error);
                this.errorMessage = 'Failed to update employee';
            },
        });
    }

    cancel(): void {
        this.router.navigate(['/employees']);
    }
}