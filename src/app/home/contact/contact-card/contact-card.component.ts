import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Contact } from "../../../interfaces/contact.interface";
import { TitleCasePipe } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactService } from "../../../../services/contact.service";

@Component({
    selector: 'contact-card',
    imports: [
        TitleCasePipe,
        ReactiveFormsModule
    ],
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

    @Output('showDialog') showDialog = new EventEmitter<boolean>();
    @Input() contactData?: Contact;

    public contactForm!: FormGroup;

    constructor(private contactService: ContactService) {}

    ngOnInit() {
        this.contactForm = new FormGroup({
            firstname : new FormControl(this.contactData?.firstname, Validators.required),
            lastname : new FormControl(this.contactData?.lastname, Validators.required),
            email : new FormControl(this.contactData?.email, Validators.required),
            phone : new FormControl(this.contactData?.phone, Validators.required),
            note : new FormControl(this.contactData?.note),
        })
    }

    public preventPropagation(event: any) {
        event.stopPropagation();
        console.log('Prevent propagation');
    }

    public deleteContact() {
        if(this.contactData?.id) {
            this.contactService.deleteContact(this.contactData?.id);
        }
    }

    public updateContact(id?: string | null | undefined) {
        if(id) {
            this.contactService.updateContact(id, this.contactForm.value);
        }
    }

}
