import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; //  Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], //  Add FormsModule to imports
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';  
  password = '';  
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
      this.authService.login({ username: this.username, password: this.password }).subscribe({
          next: (response) => {
              console.log('Login successful', response);
              this.router.navigate(['/employees']);
          },
          error: (error) => {
              console.error('Login failed', error);
              this.errorMessage = 'Invalid credentials';
          },
      });
  }
}