import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Contact } from "../../../interfaces/contact.interface";
import { Note } from "../../../interfaces/note.interface";
import { ContactService } from "../../../../services/contact.service";
import { NotesService } from "../../../../services/notes.service";
import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'note-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
    NgStyle,
    NgClass
],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.scss'
})
export class NoteCreateComponent {

  @Output('showNoteCreateDialog') showNoteCreateDialog = new EventEmitter<boolean>();
  @Output() noteCreated = new EventEmitter<Note>();

  public noteForm!: FormGroup;
  public date = new Date();
  public contacts: Contact[] = [];
  public showContacts = false;
  public selectedContacts: Contact[] = [];

  constructor(private contactService: ContactService, private noteService: NotesService) {}

  public ngOnInit() {
    this.fillForm();
    this.fetchContacts();
  }

  private fillForm() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.noteForm = new FormGroup({
      headline : new FormControl('', Validators.required),
      company : new FormControl(''),
      startDate: new FormControl(currentDate, Validators.required),
      endDate: new FormControl(currentDate, Validators.required),
      note : new FormControl(''),
      priority : new FormControl(''),
      contactIds : new FormControl([]),
    })
  }

  private async fetchContacts() {
    this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contacts = response;
        this.contacts.sort((a, b) => (a.lastname ?? '').localeCompare(b.lastname ?? ''));
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
  }

  public getNoteLength(): number{
    return this.noteForm.get('note')?.value.length || 0;
  }

  toggleContacts(): void {
    this.showContacts = !this.showContacts;
  }

  toggleContactSelection(contactId: Contact): void {
    if (this.selectedContacts.includes(contactId)) {
      this.selectedContacts = this.selectedContacts.filter(id => id !== contactId);
    } else {
      this.selectedContacts.push(contactId);
    }
  }

  isSelected(contactId: Contact): boolean {
    return this.selectedContacts.includes(contactId);
  }

}
