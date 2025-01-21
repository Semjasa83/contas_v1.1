import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { Note } from "../app/interfaces/note.interface";


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl: string = environment.apiUrl;
  private notesUrl: string = ( this.apiUrl + `/api/notes/`);
  private notes = new BehaviorSubject<Note[]>([]);
  notes$ = this.notes.asObservable();
  private token = (localStorage.getItem('authToken') || '').trim();
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient) { }

  public getAllNotes(): Observable<Note[]> {
    const headers = this.headers
    return this.http.get<Note[]>(this.notesUrl, { headers })
        .pipe(
            catchError(this.handleError)
        );
  }

  public createNote(note: Note): void {
    this.http.post(this.notesUrl, note, { headers: this.headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => {
              console.log('Note created successfully');
              this.getAllNotes();
            },
            (error: any) => console.error('Error creating note:', error)
        );
  }

  public updateNote(id: string, note: Note): void {
    const headers = this.headers
    this.http.put(this.notesUrl + id + '/', note, { headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => this.getAllNotes(),
            (error: any) => console.error('Error updating note:', error)
        );
  }

  public deleteNote(id: string): void {
    console.log(id);
    console.log(this.notesUrl + id + '/');
    this.http.delete(this.notesUrl + id + '/', { headers: this.headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => {
              console.log('Note deleted successfully');
              this.getAllNotes(); // Optional: Aktualisieren Sie die Kontaktliste nach dem Löschen
            },
            (error: any) => console.error('Error deleting note:', error)
        );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
