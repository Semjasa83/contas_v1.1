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

  // constructor(private store: Store, private router: Router) {}

  // public ngOnInit() {
  //   if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       this.store.dispatch(loginSuccess({ token }));
  //       this.router.navigate([ '/home' ]);
  //     }
  //   }
  // }
  token$: Observable<string | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.token$ = this.store.select(state => state.auth.token);
  }
}
