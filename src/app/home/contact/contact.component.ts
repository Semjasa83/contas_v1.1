import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Contact } from "../../interfaces/contact.interface";

@Component({
    selector: 'contact',
    imports: [
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    public contacts: Contact[] = [];

    constructor( private contactService: ContactService ) {

    }

    public async ngOnInit() {
        this.contactService.getAllContacts();
        this.contactService.contacts$.subscribe(response => {
            this.contacts = response;
            console.log(this.contacts);
        });

    }

}
