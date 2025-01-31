import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Contact } from "../../interfaces/contact.interface";
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgStyle, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { ContactCreateComponent } from "./contact-create/contact-create.component";
import { IconAddComponent } from '../../../../public/assets/icons/icon-add.component';
import { Subscription } from "rxjs";

@Component({
    selector: 'contact',
    imports: [
        ContactCardComponent,
        ContactCreateComponent,
        UpperCasePipe,
        TitleCasePipe,
        NgStyle,
        IconAddComponent
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    standalone: true
})

export class ContactComponent {

    public contacts: Contact[] = [];
    public showContactEditDialog: boolean = false;
    public showContactCreateDialog: boolean = false;
    public selectedContact?: Contact;
    public indexLetters: string[] = [];
    public indexContacts: { [key: string]: Contact[] } = {};
    private pollingSubscription?: Subscription;

    constructor( private contactService: ContactService) {}

    public ngOnInit(): void {
        this.contactService.getAllContacts().subscribe(response => {
          this.contacts = response;
          this.sortContacts(this.contacts);
        }, error => {
          console.error('Error fetching contacts:', error);
        });
        this.startPolling();
      }

    private ngOnDestroy(): void {
        this.stopPolling();
    }

    private sortContacts(contacts: Contact[]) {
        this.indexLetters = [];
        this.indexContacts = {};
        contacts.sort((a, b) => (a.lastname ?? '').localeCompare(b.lastname ?? ''));
        contacts.forEach(contact => {
            const firstLetter = (contact.lastname ?? '')[0].toUpperCase();
            if (!this.indexLetters.includes(firstLetter)) {
                this.indexLetters.push(firstLetter);
                this.indexContacts[firstLetter] = [];
            }
            this.indexContacts[firstLetter].push(contact);
        });
    }

    public handleEditDialog(event: boolean) {
        this.showContactEditDialog = event;
    }

    public handleCreateDialog(event: boolean) {
        this.showContactCreateDialog = event;
    }

    public selectContact(contact: Contact) {
        this.selectedContact = contact;
        this.showContactEditDialog = true;
    }

    public onContactDeleted() {
        this.contactService.getAllContacts().subscribe(response => {
            this.contacts = response;
            this.sortContacts(this.contacts);
        });
    }

    public onContactCreated(newContact: Contact) {
        this.contacts.push(newContact);
        this.sortContacts(this.contacts);
    }

    private startPolling(): void {
        this.pollingSubscription = new Subscription();
        const polling = setInterval(() => {
            this.contactService.getAllContacts().subscribe(response => {
                this.contacts = response;
                this.sortContacts(this.contacts);
            }, error => {
                console.error('Error fetching contacts:', error);
            });
        }, 2000);
        this.pollingSubscription.add({ unsubscribe: () => clearInterval(polling) });
    }

    private stopPolling(): void {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
        }
    }

}
