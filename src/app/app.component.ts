import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
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

  constructor(private store: Store, private router: Router) {}

  public ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.store.dispatch(loginSuccess({ token }));
        this.router.navigate([ '/home' ]);
      }
    }
  }

}
