import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from "../../../interfaces/contact.interface";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactService } from "../../../../services/contact.service";

@Component({
  selector: 'contact-create',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './contact-create.component.html',
  styleUrl: './contact-create.component.scss'
})
export class ContactCreateComponent {

  @Output('showCreateDialog') showCreateDialog = new EventEmitter<boolean>();

  public contactForm!: FormGroup;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      phone : new FormControl('', Validators.required),
      note : new FormControl(''),
    })
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
  }

  public createContact() {
    this.contactService.createContact(this.contactForm.value);
    this.showCreateDialog.emit(false);
  }
}
