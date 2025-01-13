import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { Contact } from "../app/interfaces/contact.interface";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environment.apiUrl;
  private contactsUrl: string = ( this.apiUrl + `/api/contacts/`);
  private contacts = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contacts.asObservable();
  private token = (localStorage.getItem('authToken') || '').trim();
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });


  constructor(private http: HttpClient) {}

  public getAllContacts(): Observable<Contact[]> {
    const headers = this.headers
    return this.http.get<Contact[]>(this.contactsUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public createContact(contact: Contact): void {
    this.http.post(this.contactsUrl, contact, { headers: this.headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => {
              console.log('Contact created successfully');
              this.getAllContacts();
            },
            (error: any) => console.error('Error creating contact:', error)
        );
  }

  public updateContact(id: string, contact: Contact): void {
    const headers = this.headers
    this.http.put(this.contactsUrl + id + '/', contact, { headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => this.getAllContacts(),
            (error: any) => console.error('Error updating contact:', error)
        );
  }

  public deleteContact(id: string): void {
    console.log(id);
    console.log(this.contactsUrl + id + '/');
    this.http.delete(this.contactsUrl + id + '/', { headers: this.headers })
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            () => {
              console.log('Contact deleted successfully');
              this.getAllContacts(); // Optional: Aktualisieren Sie die Kontaktliste nach dem Löschen
            },
            (error: any) => console.error('Error deleting contact:', error)
        );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
