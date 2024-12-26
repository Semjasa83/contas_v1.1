import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "../../../services/login.service";

@Component({
  selector: 'user-login',
    imports: [
        RouterLink,
        RouterLinkActive,
        ReactiveFormsModule
    ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})

export class UserLoginComponent {

    loginForm = new FormGroup({
        username: new FormControl<string>(''),
        password: new FormControl<string>(''),
    });

    constructor(private loginService: LoginService) {}

    public login() {
        if (this.loginForm.valid) {
            this.loginService.login({
                username: this.loginForm.get('username')?.value,
                password: this.loginForm.get('password')?.value
            });
        }
    }
}
