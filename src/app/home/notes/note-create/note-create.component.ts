import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Contact } from "../../../interfaces/contact.interface";
import { Note } from "../../../interfaces/note.interface";
import { ContactService } from "../../../../services/contact.service";
import { NotesService } from "../../../../services/notes.service";
import { DateFormatPipe } from "../../../interfaces/datePipe";

@Component({
  selector: 'note-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DateFormatPipe
  ],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.scss'
})
export class NoteCreateComponent {

  @Output('showNoteCreateDialog') showNoteCreateDialog = new EventEmitter<boolean>();
  @Output() noteCreated = new EventEmitter<Note>();

  public noteForm!: FormGroup;

  constructor(private contactService: ContactService, private noteService: NotesService) {}

  ngOnInit() {
    this.noteForm = new FormGroup({
      headline : new FormControl('', Validators.required),
      company : new FormControl(''),
      startDate : new FormControl(''),
      endDate: new FormControl(''),
      note : new FormControl(''),
      priority : new FormControl(''),
      contactIds : new FormControl([]),
    })
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
  }

  public getNoteLength(): number{
    return this.noteForm.get('note')?.value.length || 0;
  }

}
