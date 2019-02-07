import { BrandCarouselItemComponent } from './brand-carousel-item/brand-carousel-item.component';
import { BrandCarouselComponent } from './brand-carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [BrandCarouselComponent, BrandCarouselItemComponent],
  exports: [BrandCarouselComponent, BrandCarouselItemComponent],
})
export class AppBrandCarousel {}
