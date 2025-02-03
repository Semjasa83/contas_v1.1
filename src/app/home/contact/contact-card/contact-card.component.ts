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

    @Output('showContactEditDialog') showContactEditDialog = new EventEmitter<boolean>();
    @Output() contactDeleted = new EventEmitter<void>();
    @Input() contactData?: Contact;

    public contactForm!: FormGroup;

    constructor(private contactService: ContactService) {}

    ngOnInit() {
        this.contactForm = new FormGroup({
            firstname : new FormControl(this.contactData?.firstname, Validators.required),
            lastname : new FormControl(this.contactData?.lastname, Validators.required),
            email : new FormControl(this.contactData?.email, Validators.required),
            company: new FormControl(this.contactData?.company),
            phone : new FormControl(this.contactData?.phone, Validators.required),
            note : new FormControl(this.contactData?.note),
        })
    }

    public preventPropagation(event: any) {
        event.stopPropagation();
    }

    public getNoteLength() : number {
        return this.contactForm.get('note')?.value.length || 0;
    }

    public async deleteContact() {
        if (this.contactForm.valid && this.contactData?.id) {
            await this.contactService.deleteContact(this.contactData.id);
            this.contactDeleted.emit();
        } else {
            console.error('Form is invalid or contact ID is missing');
        }
    }

    public async updateContact(id?: string | null | undefined) {
        if (this.contactForm.valid && id) {
            this.contactService.updateContact(id, this.contactForm.value);
            this.showContactEditDialog.emit(false);
        } else {
            console.error('Form is invalid or contact ID is missing');
        }
    }
}
