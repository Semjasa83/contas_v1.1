import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PasswordForgotComponent } from "./login/password-forgot/password-forgot.component";
import { UserLoginComponent } from "./login/user-login/user-login.component";
import { RegistrationComponent } from "./login/registration/registration.component";
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirect to `first-component`
    {
        path: 'login',
        children: [
            { path: '', component: UserLoginComponent },
            { path: 'password', component: PasswordForgotComponent },
            { path: 'registration', component: RegistrationComponent },
        ]
    },
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            //{ path: 'board', component: BoardComponent },
            { path: 'contacts', component: ContactComponent},
        ]
    },
    // { path: '**', component: PageNotFoundComponent },
];