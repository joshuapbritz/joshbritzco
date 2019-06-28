import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerServiceWorker } from './app/common/helpers/registerServiceWorker';
import { Logger } from './app/common/helpers/logger';

if (environment.production) {
  enableProdMode();

  if (
    window.location.href.includes('//joshbritz.co') ||
    window.location.href.includes('//www.joshbritz.co')
  ) {
    Object.keys(console).forEach(type => {
      console[type] = () => {};
    });
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(registerServiceWorker)
  .catch(err => new Logger('Bootstraping', '#0059ff').error(err));
