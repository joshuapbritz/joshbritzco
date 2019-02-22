import { AppBrandCarousel } from 'src/app/components/brand-carousel/brand-carousel.module';
import { NgModule } from '@angular/core';
import { AppBlogCards } from './blog-cards/blog-cards.module';
import { AppDisplayCards } from './display-cards/display-cards.module';
import { AppModal } from './modal/modal.module';
import { AppNavbar } from './navbar/navbar.module';
import { AppSnippets } from './snippets/snippets.module';
import { AppSocial } from './social/social.module';
import { AppTimeline } from './timeline/timeline.module';
import { AppToast } from './toast/toast.module';
import { AppBlogPostHeader } from './blog-post-header/blog-post-header.module';
import { AppComingSoon } from './coming-soon/coming-soon.module';

@NgModule({
  imports: [
    AppBlogCards,
    AppBrandCarousel,
    AppDisplayCards,
    AppModal,
    AppNavbar,
    AppSnippets,
    AppSocial,
    AppTimeline,
    AppToast,
    AppBlogPostHeader,
    AppComingSoon,
  ],
  exports: [
    AppBlogCards,
    AppBrandCarousel,
    AppDisplayCards,
    AppModal,
    AppNavbar,
    AppSnippets,
    AppSocial,
    AppTimeline,
    AppToast,
    AppBlogPostHeader,
    AppComingSoon,
  ],
})
export class AppComponentsModule {}
