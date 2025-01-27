import { Component } from '@angular/core';
import { NgStyle, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { NoteCardComponent } from "./note-card/note-card.component";
import { NoteCreateComponent } from "./note-create/note-create.component";
import { IconAddComponent } from '../../../../public/assets/icons/icon-add.component';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Note } from "../../interfaces/note.interface";
import { NotesService } from '../../../services/notes.service';


@Component({
  selector: 'notes',
    imports: [
        NoteCardComponent,
        NoteCreateComponent,
        IconAddComponent,
        DragDropModule,
        NgStyle,
    ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  public notes: Note[] = [];
  public showNoteEditDialog: boolean = false;
  public showNoteCreateDialog: boolean = false;
  public selectedNote?: Note;
  public todo: Note[] = [];
  public low: Note[] = [];
  public high: Note[] = [];
  public done: Note[] = [];


  constructor( private noteService: NotesService) {}

  public ngOnInit(): void {
    this.noteService.getAllNotes().subscribe(response => {
      this.notes = response;
      console.log(this.notes);
    }, error => {
      console.error('Error fetching notes:', error);
    });
  }
  
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
