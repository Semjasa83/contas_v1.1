import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../auth/auth.actions';
import { Observable } from 'rxjs';
import { AuthState } from '../auth/auth.reducer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contas_v1.1';
  token$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.token$ = this.store.select(state => state.auth.token);
  }
}
