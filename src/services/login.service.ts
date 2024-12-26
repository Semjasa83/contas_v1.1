import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, catchError, throwError } from "rxjs";
import { User, RegisterUser } from "../app/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private apiUrl: string = environment.apiUrl;
    private loginUrl: string = ( this.apiUrl + `/auth/login/`);

  constructor(private http: HttpClient) { }

  public login( user: { username: string | null | undefined; password: string | null | undefined } ): void {
    this.http.post(this.loginUrl, user)
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            (data: any) => console.log('Login successful:', data.token),
            (error: any) => console.error('Error logging in:', error),
        );

  }

  public register(user: RegisterUser): void {
    this.http.post(this.loginUrl, user)
        .pipe(
            catchError(this.handleError)
        )
        .subscribe(
            (data: any) => console.log('Registration successful:', data),
            (error: any) => console.error('Error registering:', error)
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
