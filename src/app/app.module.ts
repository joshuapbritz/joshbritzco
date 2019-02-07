import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  RouterModule,
  Router,
  NavigationEnd,
  PreloadAllModules,
} from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import * as router from './app.routes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(router.routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
        window.scrollTo(0, 0);
        if (!environment.production) {
          console.log(event.urlAfterRedirects);
        }
      }
    });
  }
}
