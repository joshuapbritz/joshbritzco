import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { registerServiceWorker } from './app/common/helpers/registerServiceWorker';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // .then(registerServiceWorker)
  .catch(err => console.log(err));
