import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from '../reducers';
import { TokenInterceptor } from '../auth/token.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideStore(reducers, { metaReducers }),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideEffects(),
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
};
