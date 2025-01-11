import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { ActionReducerMap, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { metaReducers } from '../reducers';
import { AuthInterceptor } from '../auth/auth.interceptor';


export const reducers: ActionReducerMap<{ auth: AuthState }> = {
  auth: authReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    //provideHttpClient(withFetch()),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(), // Fügen Sie Ihre Effekte hier hinzu, falls vorhanden
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};