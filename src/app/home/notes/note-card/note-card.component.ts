import { Component, Input } from '@angular/core';
import { NotesService } from "../../../../services/notes.service";
import { Note } from "../../../interfaces/note.interface";
import { NgClass } from "@angular/common";

@Component({
  selector: 'note-card',
  imports: [
    NgClass
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {

  @Input() noteData?: Note;

  constructor() {}

  public preventPropagation(event: any) {
    event.stopPropagation();
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

  public getPriorityClass( priority: number | null | undefined ): string {
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
}
