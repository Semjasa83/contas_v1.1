import { Component, Input } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from "../../interfaces/contact.interface";
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgStyle, TitleCasePipe, UpperCasePipe } from "@angular/common";

@Component({
    selector: 'contact',
    imports: [
        ContactCardComponent,
        UpperCasePipe,
        TitleCasePipe,
        NgStyle,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    public contacts: Contact[] = [];
    public showContactDialog: boolean = false;
    public selectedContact?: Contact;
    public indexLetters: string[] = [];

    constructor( private contactService: ContactService) {}

    public async ngOnInit() {
        this.contactService.getAllContacts();
        this.contactService.contacts$.subscribe(response => {
            this.contacts = response;
            this.sortContacts(this.contacts);
        });
        console.log(this.contacts);
    }

    private sortContacts(contacts: Contact[]) {
        // const name = contacts.map(contact => contact.name);
        // const splitName = name.map(name => name?.split(' '));
        // console.log(splitName);
        contacts.sort((a, b) => (a.lastname ?? '').localeCompare(b.lastname ?? ''));

    }

    public handleDialog(event: any) {
        this.showContactDialog = event;
    }

    public selectContact(contact: Contact) {
        this.selectedContact = contact;
        this.showContactDialog = true;
    }

}
