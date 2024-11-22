import { Component } from '@angular/core';
import {NavbarComponent} from '../utilities/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'home',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {

}
