import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div>API URL: {{ apiUrl }}</div>
    <div *ngIf="!isProduction">This is not production!</div>
  `
 
})
export class AppComponent {
  title = 'Lab_exercise10_101362082';
  apiUrl = environment.apiUrl;
  isProduction = environment.production;

  constructor() {
    console.log('Current Environment:', environment);
  }
}
