import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';


@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private apollo: Apollo) { }

    getEmployees(): Observable<Employee[]> {
        return this.apollo
          .watchQuery<{ getAllEmployees: Employee[] }>({
                query: gql`
                    query {
                        getAllEmployees {
                            _id
                            first_name
                            last_name
                            email
                            gender
                            designation
                            salary
                            date_of_joining
                            department
                            employee_photo
                            created_at
                            updated_at
                        }
                    }
                `,
            })
            .valueChanges.pipe(map((result) => result.data.getAllEmployees));
    }
    getEmployee(id: string): Observable<Employee> { 
      return this.apollo
      .watchQuery<{ searchEmployeeByEid:{
        _id: string;
                first_name: string;
                last_name: string;
                email: string;
                gender: string;
                designation: string;
                salary: number;
                date_of_joining: string;
                department: string;
                employee_photo?: string;
                created_at?: string;
                updated_at?: string;
      } }>({
              query: gql`
                  query SearchEmployeeByEid($eid: ID!) {
                      searchEmployeeByEid(eid: $eid) {
                          _id
                          first_name
                          last_name
                          email
                          gender
                          designation
                          salary
                          date_of_joining
                          department
                          employee_photo
                          created_at
                          updated_at
                      }
                  }
              `,
              variables: { eid: id }, // Corrected variable name to eid
          })
          .valueChanges.pipe(map((result) => result.data.searchEmployeeByEid)); // Corrected path
    }

    addEmployee(employee: any): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
                mutation AddNewEmployee(
                    $first_name: String!,
                    $last_name: String!,
                    $email: String!,
                    $gender: String!,
                    $designation: String!,
                    $salary: Float!,
                    $date_of_joining: String!,
                    $department: String!,
                    $employee_photo: String
                ) {
                    addNewEmployee(
                        first_name: $first_name,
                        last_name: $last_name,
                        email: $email,
                        gender: $gender,
                        designation: $designation,
                        salary: $salary,
                        date_of_joining: $date_of_joining,
                        department: $department,
                        employee_photo: $employee_photo
                    ) {
                        _id
                        first_name
                        last_name
                        email
                        gender
                        designation
                        salary
                        date_of_joining
                        department
                        employee_photo
                        created_at
                        updated_at
                    }
                }
            `,
            variables: employee,
        });
      }

      updateEmployee(id: string, employee: any): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
                mutation UpdateEmployeeByEid(
                    $eid: ID!,
                    $first_name: String,
                    $last_name: String,
                    $email: String,
                    $gender: String,
                    $designation: String,
                    $salary: Float,
                    $date_of_joining: String,
                    $department: String,
                    $employee_photo: String
                ) {
                    updateEmployeeByEid(
                        eid: $eid,
                        first_name: $first_name,
                        last_name: $last_name,
                        email: $email,
                        gender: $gender,
                        designation: $designation,
                        salary: $salary,
                        date_of_joining: $date_of_joining,
                        department: $department,
                        employee_photo: $employee_photo
                    ) {
                        _id
                        first_name
                        last_name
                        email
                        gender
                        designation
                        salary
                        date_of_joining
                        department
                        employee_photo
                        created_at
                        updated_at
                    }
                }
            `,
            variables: { eid: id, ...employee },
        });
    }

    deleteEmployee(id: string): Observable<any> {
        return this.apollo.mutate({
            mutation: gql`
                mutation DeleteEmployeeByEid($eid: ID!) {
                    deleteEmployeeByEid(eid: $eid)
                }
            `,
            variables: { eid: id },
        });
    }
}
  