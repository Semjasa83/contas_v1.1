import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './home/contact/contact.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      //{ path: 'board', component: BoardComponent },
      { path: 'contacts', component: ContactComponent },

    ]
      },
  // { path: '**', component: PageNotFoundComponent },
];
