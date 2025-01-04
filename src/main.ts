import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    // Entfernen Sie provideRouter(routes) hier, da es bereits in app.config.ts bereitgestellt wird
  ],
}).catch((err) => console.error(err));