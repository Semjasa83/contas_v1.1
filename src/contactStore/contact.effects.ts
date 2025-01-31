import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ContactActions from './contact.actions';
import { ContactService } from '../services/contact.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContactEffects {
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      mergeMap(() =>
        this.contactService.getAllContacts().pipe(
          map(contacts => ContactActions.loadContactsSuccess({ contacts })),
          catchError(error => of(ContactActions.loadContactsFailure({ error })))
        )
      )
    )
  );

  // Ähnliche Effekte für Create, Update und Delete Aktionen

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}