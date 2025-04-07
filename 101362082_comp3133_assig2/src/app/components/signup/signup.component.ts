import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, CommonModule], 
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent {
    username = '';
    email = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService, private router: Router) { }

    signup(): void {
        this.authService.signup({ username: this.username, email: this.email, password: this.password }).subscribe({
            next: (response) => {
                console.log('Signup successful', response);
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Signup failed', error);
                this.errorMessage = 'Signup failed';
            },
        });
    }
}