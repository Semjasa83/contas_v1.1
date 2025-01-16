import { Component } from '@angular/core';
import { TitleCasePipe, UpperCasePipe } from "@angular/common";
import { NoteCardComponent } from "./note-card/note-card.component";
import { NoteCreateComponent } from "./note-create/note-create.component";
import { IconAddComponent } from '../../../../public/assets/icons/icon-add.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Note } from "../../interfaces/note.interface";

@Component({
  selector: 'notes',
  imports: [
    NoteCardComponent,
    NoteCreateComponent,
    IconAddComponent,
    DragDropModule,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  public notes: Note[] = [];
  public showNoteEditDialog: boolean = false;
  public showNoteCreateDialog: boolean = false;
  public selectedNote?: Note;
  public indexNote: any;
  public indexNotes: any;

  /*
  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private pollingInterval: any;
  public showAddTask: boolean = false;

  // @HostListener('window:resize', ['$event'])
  public done: Task[] = [];
  public feedback: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];
  */

}
