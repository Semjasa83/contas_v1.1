import { Component } from '@angular/core';
import {NavbarComponent} from '../utilities/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
