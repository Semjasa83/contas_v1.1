import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';

@Component({
    selector: 'contact',
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    constructor( private contactService: ContactService ) {


    }

}
