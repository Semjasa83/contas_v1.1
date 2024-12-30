import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpInterceptorFn,
    HttpHandlerFn,
    HttpEvent
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { switchMap } from 'rxjs/operators';
import { Observable } from "rxjs";

//
// export class TokenInterceptor implements HttpInterceptor {
//     constructor(private store: Store<{ auth: AuthState }>) {}
//
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         return this.store.select(state => state.auth.token).pipe(
//             switchMap((token) => {
//                 if (token) {
//                     const clonedReq = req.clone({
//                         headers: req.headers.set('Authorization', `Bearer ${token}`),
//                     });
//                     return next.handle(clonedReq);
//                 }
//                 return next.handle(req);
//             })
//         );
//     }
// }

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const store = inject(Store<{ auth: AuthState }>);
    return store.select(state => state.auth.token).pipe(
        switchMap((token) => {
            if (token) {
                const clonedReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`),
                });
                return next(clonedReq);
            }
            return next(req);
        })
    );
};