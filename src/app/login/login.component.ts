import { Component } from '@angular/core';
import {UserLoginComponent} from './user-login/user-login.component';

@Component({
  selector: 'login',
  imports: [
    UserLoginComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
