import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { authReducer, AuthState } from '../auth/auth.reducer';

export interface State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];