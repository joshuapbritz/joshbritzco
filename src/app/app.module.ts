import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeService } from './pages/home/home.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import * as router from './app.routes';
import { AboutComponent } from './pages/about/about.component';
import { AboutService } from './pages/about/about.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WorkComponent } from './pages/work/work.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { WorkService } from './pages/work/work.service';
import { SkillsService } from './pages/skills/skills.service';
import { SocialComponent } from './components/social/social.component';
import { ModalComponent } from './components/modal/modal.component';
import { JsHrefDirective } from './directives/js-href.directive';
import { BrandCarouselComponent } from './components/brand-carousel/brand-carousel.component';
import { BrandCarouselItemComponent } from './components/brand-carousel/brand-carousel-item/brand-carousel-item.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelineSectionComponent } from './components/timeline/timeline-section/timeline-section.component';
import { TimelineSectionItemComponent } from './components/timeline/timeline-section-item/timeline-section-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    WorkComponent,
    SkillsComponent,
    SocialComponent,
    ModalComponent,
    JsHrefDirective,
    BrandCarouselComponent,
    BrandCarouselItemComponent,
    TimelineComponent,
    TimelineSectionComponent,
    TimelineSectionItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(router.routes),
  ],
  providers: [
    ApiService,
    HomeService,
    AboutService,
    WorkService,
    SkillsService,
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
