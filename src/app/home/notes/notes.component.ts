import { Component } from '@angular/core';
import { NgTemplateOutlet } from "@angular/common";
import { NoteCardComponent } from "./note-card/note-card.component";
import { NoteCreateComponent } from "./note-create/note-create.component";
import { IconAddComponent } from '../../../../public/assets/icons/icon-add.component';
import { DragDropModule, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { NoteImpl } from "../../interfaces/note.interface";
import { NotesService } from '../../../services/notes.service';


@Component({
    selector: 'notes',
    imports: [
        NoteCardComponent,
        NoteCreateComponent,
        IconAddComponent,
        DragDropModule,
        NgTemplateOutlet,
    ],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss'
})
export class NotesComponent {
    public notes: NoteImpl[] = [];
    public showNoteEditDialog: boolean = false;
    public showNoteCreateDialog: boolean = false;
    public selectedNote?: NoteImpl;
    public todo: NoteImpl[] = [];
    public low: NoteImpl[] = [];
    public high: NoteImpl[] = [];
    public done: NoteImpl[] = [];


    constructor( private noteService: NotesService ) {
    }

    public ngOnInit(): void {
        this.noteService.getAllNotes().subscribe(response => {
            this.notes = response;
            this.distributeNotesByPriority();
            console.log(this.notes);
        }, error => {
            console.error('Error fetching notes:', error);
        });
    }

    private distributeNotesByPriority(): void {
        this.todo = [];
        this.low = [];
        this.high = [];
        this.done = [];

        this.notes.forEach(note => {
            switch (note.priority) {
                case 1:
                    this.todo.push(note);
                    break;
                case 2:
                    this.low.push(note);
                    break;
                case 3:
                    this.high.push(note);
                    break;
                case 4:
                    this.done.push(note);
                    break;
                default:
                    console.warn(`Unknown priority: ${note.priority}`);
            }
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
