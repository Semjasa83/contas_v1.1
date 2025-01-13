import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(private router: Router, private http: HttpClient) {}

    login(username: string, password: string) {
        this.http.post<{ token: string }>('/api/login', { username, password })
            .subscribe({
                next: (response) => {
                    if (response.token) {
                        // Save the token (e.g., in localStorage)
                        localStorage.setItem('authToken', response.token);
                        // Navigate to the home page
                        this.router.navigate(['/home']);
                    }
                },
                error: (err) => {
                    console.error('Login failed', err);
                    // Handle error (e.g., show error message to the user)
                }
            });
    }
}
