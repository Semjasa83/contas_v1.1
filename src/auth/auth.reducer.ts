import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
    token: string | null;
}

export const initialState: AuthState = {
    token: null,
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token }) => {
        localStorage.setItem('authToken', token); // Save token to localStorage
        return { ...state, token };
    }),
    on(logout, state => {
        localStorage.removeItem('authToken'); // Remove token from localStorage
        return { ...state, token: null };
    })
);