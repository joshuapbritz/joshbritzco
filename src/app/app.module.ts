import { BrowserModule } from '@angular/platform-browser';
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
import { AppComponentsModule } from './components/components.module';
import { Logger } from './common/helpers/logger';
import { isProduction } from './common/helpers/isProductions';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(router.routes, {
      preloadingStrategy: PreloadAllModules,
    }),
    AppComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private routerInstance: Router) {
    const galogger: Logger = new Logger('Analytics', '#E37400');

    this.routerInstance.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (window as any).ga('set', 'page', event.urlAfterRedirects);
        (window as any).ga('send', 'pageview');
        window.scrollTo(0, 0);
        if (!isProduction()) {
          galogger.info(
            'Navigation to',
            `"${event.urlAfterRedirects}"`,
            'logged to Google Analytics'
          );
        }
      }
    });
  }
}
