import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-registration',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

}
