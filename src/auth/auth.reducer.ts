import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    }
    return { ...state, token };
  }),
  on(logout, (state) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
    return { ...state, token: null };
  })
);