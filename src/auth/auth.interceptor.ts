import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<{ auth: AuthState }>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(state => state.auth.token).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const clonedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(clonedReq);
        }
        return next.handle(req);
      })
    );
  }
}