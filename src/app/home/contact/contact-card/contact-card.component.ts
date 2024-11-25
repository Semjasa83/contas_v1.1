import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Contact } from "../../../interfaces/contact.interface";

@Component({
    selector: 'contact-card',
    imports: [],
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

    @Output('showDialog') showDialog = new EventEmitter<boolean>();
    //@Input('data') data: Contact = {};
    @Input() contactData?: Contact;

    constructor() {

    }

    public ngOnInit() {
        console.log(this.contactData);
    }

    public preventPropagation(event: any) {
        event.stopPropagation();
    }
}
