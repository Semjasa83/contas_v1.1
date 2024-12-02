import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'password-forgot',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.scss'
})
export class PasswordForgotComponent {

}
