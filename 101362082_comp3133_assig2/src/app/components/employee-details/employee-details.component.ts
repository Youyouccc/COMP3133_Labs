import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './employee-details.component.html',
    styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
    employee$!: Observable<any>;
    employeeId!: string;

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.employeeId = params['id'];
            this.employee$ = this.employeeService.getEmployee(this.employeeId);
        });
    }
}