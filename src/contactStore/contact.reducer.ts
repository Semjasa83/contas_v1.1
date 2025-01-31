import { createReducer, on } from '@ngrx/store';
import { Contact } from '../../interfaces/contact.interface';
import * as ContactActions from './contact.actions';

export interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: any;
}

export const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactReducer = createReducer(
  initialState,
  on(ContactActions.loadContacts, state => ({ ...state, loading: true })),
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    loading: false,
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  // Ähnliche Handler für Create, Update und Delete Aktionen
);