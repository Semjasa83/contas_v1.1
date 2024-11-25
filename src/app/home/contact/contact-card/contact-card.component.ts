import { Component, Output, EventEmitter } from '@angular/core';
import { Contact } from "../../../interfaces/contact.interface";

@Component({
    selector: 'contact-card',
    imports: [],
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
    @Output('showDialog') showDialog = new EventEmitter<boolean>();

    public preventPropagation(event: any) {
        event.stopPropagation();
    }
}
