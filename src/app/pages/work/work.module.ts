import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';
import { Routes, RouterModule } from '@angular/router';
import { AppDisplayCards } from 'src/app/components/display-cards/display-cards.module';
import { AppBrandCarousel } from 'src/app/components/brand-carousel/brand-carousel.module';

const routes: Routes = [{ path: '', component: WorkComponent }];

@NgModule({
  imports: [
    CommonModule,
    AppDisplayCards,
    AppBrandCarousel,
    RouterModule.forChild(routes),
  ],
  declarations: [WorkComponent],
})
export class WorkPageModule {}
