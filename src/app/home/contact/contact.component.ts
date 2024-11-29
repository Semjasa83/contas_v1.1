import { Component, Input } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from "../../interfaces/contact.interface";
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgStyle, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { ContactEditComponent } from "./contact-edit/contact-edit.component";

@Component({
    selector: 'contact',
    imports: [
        ContactCardComponent,
        UpperCasePipe,
        TitleCasePipe,
        NgStyle,
        ContactEditComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    public contacts: Contact[] = [];
    public showContactDialog: boolean = false;
    public showContactEditDialog: boolean = false;
    public selectedContact?: Contact;
    public indexLetters: string[] = [];
    public indexContacts: { [key: string]: Contact[] } = {};

    constructor( private contactService: ContactService) {}

    public async ngOnInit() {
        this.contactService.getAllContacts();
        this.contactService.contacts$.subscribe(response => {
            this.contacts = response;
            this.sortContacts(this.contacts);
        });
    }

    private sortContacts(contacts: Contact[]) {
        this.indexLetters = [];
        this.indexContacts = {};
        contacts.sort((a, b) => (a.lastname ?? '').localeCompare(b.lastname ?? ''));
        contacts.find(contact => {
            const firstLetter = (contact.lastname ?? '')[0].toUpperCase();
            if (!this.indexLetters.includes(firstLetter)) {
                this.indexLetters.push(firstLetter);
                this.indexContacts[firstLetter] = [];
            }
            this.indexContacts[firstLetter].push(contact);
        })
    }

    public handleDialog(event: any) {
        this.showContactDialog = event;
    }

    public handleEditDialog(event: any) {
        this.showContactEditDialog = event;
    }

    public selectContact(contact: Contact) {
        this.selectedContact = contact;
        this.showContactDialog = true;
    }

    public openEditContact() {
        this.showContactEditDialog = true;
    }

}
