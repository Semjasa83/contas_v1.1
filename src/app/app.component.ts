import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contas_v1.1';

  constructor(private store: Store) {}

  public ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }

}
