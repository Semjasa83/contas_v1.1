import { Component } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { Note } from '../../../interfaces/note.interface';
import { NotesService } from '../../../../services/notes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Contact } from '../../../interfaces/contact.interface';
import { ContactService } from '../../../../services/contact.service';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'note-edit',
  imports: [
    TitleCasePipe,
    ReactiveFormsModule
  ],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss'
})
export class NoteEditComponent {

  @Output('showNoteEditDialog') showNoteEditDialog = new EventEmitter<boolean>();
  @Output() noteDeleted = new EventEmitter<void>();
  @Input() noteData?: Note;

  public noteForm!: FormGroup;
  public date = new Date();
  public contacts: Contact[] = [];
  public showContacts = false;
  public selectedContacts: Contact[] = [];

  constructor(private noteService: NotesService, private contactService: ContactService) {

  }

  public async ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.noteForm = new FormGroup({
      headline: new FormControl(this.noteData?.headline, Validators.required),
      company: new FormControl(this.noteData?.company),
      start_date: new FormControl(this.noteData?.start_date ? new Date(this.noteData.start_date).toISOString().slice(0, 10) : '', Validators.required),
      end_date: new FormControl(this.noteData?.end_date ? new Date(this.noteData.end_date).toISOString().slice(0, 10) : '', Validators.required),
      note: new FormControl(this.noteData?.note),
      priority: new FormControl(this.noteData?.priority),
      contact: new FormControl(this.noteData?.contact),
    })
  }

  public preventPropagation(event: any) {
    event.stopPropagation();
  }

  public getNoteLength() {
    // return this.noteForm.get('note')?.value.length || 0;
  }

  public async deleteNote() {
    if (this.noteForm.valid && this.noteData?.id) {
      await this.noteService.deleteNote(this.noteData.id);
      this.noteDeleted.emit();
    } else {
      console.error('Form is invalid or contact ID is missing');
    }
  }

  public async updateNote(id?: string | null | undefined) {
    if (this.noteForm.valid && id) {
      this.noteService.updateNote(id, this.noteForm.value);
      this.showNoteEditDialog.emit(false);
    } else {
      console.error('Form is invalid or contact ID is missing');
    }
  }
}



