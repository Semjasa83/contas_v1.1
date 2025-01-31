import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() contactCreated = new EventEmitter<Contact>();

  public contactForm!: FormGroup;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      company: new FormControl(''),
      phone : new FormControl('', Validators.required),
      note : new FormControl(''),
      color : new FormControl('')
    })
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
  }

  private generateRandomColor() {
    let varColor = Math.floor(Math.random() * 359);
    return `hsl(${varColor}, 75%, 75%)`;
  }

  public getNoteLength() : number {
    return this.contactForm.get('note')?.value.length || 0;
  }

  public async createContact() {
    if (this.contactForm.valid) {
      this.contactForm.patchValue({ color: this.generateRandomColor()});
      this.contactService.createContact(this.contactForm.value);
      this.contactCreated.emit(this.contactForm.value);
      this.showCreateDialog.emit(false);
    } else {
      console.error('Form is invalid');
    }
  }
}
