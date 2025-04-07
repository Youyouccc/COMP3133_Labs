import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Apollo, gql } from 'apollo-angular';
import { DOCUMENT } from '@angular/common'; // Import DOCUMENT

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:4000/graphql';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    private apollo = inject(Apollo);
    private document = inject(DOCUMENT); // Inject DOCUMENT

    constructor(private http: HttpClient, private router: Router) { }

    signup(user: User): Observable<any> {
        return this.http.post<any>(this.apiUrl, { query: `
            mutation {
                addNewEmployee(
                    first_name: "${user.username}",
                    last_name: "${user.username}",
                    email: "${user.email}",
                    gender: "Male",
                    designation: "Developer",
                    salary: 50000,
                    date_of_joining: "2024-01-01",
                    department: "IT"
                ) {
                    _id
                    first_name
                    last_name
                    email
                }
            }
        `});
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, { query: `
            mutation {
                login(username: "${credentials.username}", password: "${credentials.password}") {
                    token
                }
            }
        `}).pipe(
            tap((response: any) => {
                if (response?.data?.login?.token) {
                    this.setToken(response.data.login.token);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        this.removeToken();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (typeof window !== 'undefined') { // Check if window is defined
            return localStorage.getItem('token');
        }
        return null;
    }

    setToken(token: string): void {
        if (typeof window !== 'undefined') { // Check if window is defined
            localStorage.setItem('token', token);
        }
    }

    removeToken(): void {
        if (typeof window !== 'undefined') { // Check if window is defined
            localStorage.removeItem('token');
        }
    }

    isAuthenticated(): boolean {
        if (typeof window !== 'undefined') { // Check if window is defined
            return !!this.getToken();
        }
        return false;
    }
}