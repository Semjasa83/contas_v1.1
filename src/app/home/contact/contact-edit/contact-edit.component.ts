import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactService } from "../../../../services/contact.service";

@Component({
  selector: 'contact-edit',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent {

  @Output('showDialog') showDialog = new EventEmitter<boolean>();

  public contactForm!: FormGroup;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstname : new FormControl('' , Validators.required),
      lastname : new FormControl('' , Validators.required),
      email : new FormControl('' , Validators.required),
      phone : new FormControl('' , Validators.required),
      note : new FormControl(''),
      color : new FormControl(this.createRandomColor())
    })
    console.log(this.contactForm);
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
    console.log('Prevent propagation');
  }

  private createRandomColor() {
    return `hsl(${Math.floor(Math.random() * 255)} 75% 75%)`;
  }

  public saveContact() {
    this.contactService.createContact(this.contactForm.value);
  }
}
