import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, throwError } from "rxjs";
import { Contact } from "../app/interfaces/contact.interface";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl: string = environment.apiUrl;
  private contactsUrl: string = ( this.apiUrl + `/api/contacts/`);
  private contacts = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contacts.asObservable();

  constructor(private http: HttpClient) {}

  public getAllContacts(): void {
    this.http.get<Contact[]>(this.contactsUrl)
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            (data: Contact[]) => this.contacts.next(data),
            (error: any) => console.error('Error fetching contacts:', error)
        );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
