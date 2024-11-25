import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from "../../interfaces/contact.interface";
import { ContactCardComponent } from "./contact-card/contact-card.component";

@Component({
    selector: 'contact',
    imports: [
        ContactCardComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    public contacts: Contact[] = [];
    public showContactDialog: boolean = false;

    constructor( private contactService: ContactService ) {

    }

    public async ngOnInit() {
        this.contactService.getAllContacts();
        this.contactService.contacts$.subscribe(response => {
            this.contacts = response;
            console.log(this.contacts);
        });

    }

    public handleDialog(event: any) {
        this.showContactDialog = event;
        console.log('Dialog closed:', event);
    }

}
