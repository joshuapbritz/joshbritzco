import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostHeaderComponent } from './blog-post-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BlogPostHeaderComponent],
  exports: [BlogPostHeaderComponent],
})
export class BlogPostHeaderModule {}
