import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appRouterProviders } from './app/app-routing';

bootstrapApplication(AppComponent, {
  providers: [appRouterProviders, provideHttpClient()]
});
