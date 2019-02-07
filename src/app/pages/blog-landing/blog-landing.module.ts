import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLandingComponent } from './blog-landing.component';
import { Routes, RouterModule } from '@angular/router';
import { AppBlogCards } from 'src/app/components/blog-cards/blog-cards.module';

const routes: Routes = [{ path: '', component: BlogLandingComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AppBlogCards],
  declarations: [BlogLandingComponent],
})
export class BlogLandingPageModule {}
