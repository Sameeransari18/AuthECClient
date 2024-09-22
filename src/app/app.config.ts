import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Included the provideHttpClient() for accessing the server API's
    // Positioned the toast on top center
    provideToastr({ positionClass: 'toast-top-center' }), // Included the provideToastr() for the toast response
    provideAnimations(), // Included the provideAnimations() as it is required with the Toastr animation
  ],
};
