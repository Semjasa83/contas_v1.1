import { Component } from '@angular/core';
import { NgClass, TitleCasePipe, UpperCasePipe } from "@angular/common";
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
        NgClass,
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
            console.log(this.notes);
        }, error => {
            console.error('Error fetching notes:', error);
        });
    }

    public showPriority( priority: number ): string {
        switch ( priority ) {
            case 1:
                return 'Todo';
            case 2:
                return 'Low';
            case 3:
                return 'High';
            case 4:
                return 'Done';
            default:
                return 'NULL';
        }
    }

    public getPriorityClass(priority: number | null): string {
        switch (priority) {
            case 1:
                return 'bg-cyan-50 text-cyan-500 ring-cyan-400/20';
            case 2:
                return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
            case 3:
                return 'bg-red-50 text-red-700 ring-red-600/20';
            case 4:
                return 'bg-green-50 text-green-700 ring-green-600/20';
            default:
                return 'bg-white';
        }
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
