import { BlogCardItemComponent } from './blog-card-item/blog-card-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardRowComponent } from './blog-card-row/blog-card-row.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BlogCardItemComponent, BlogCardRowComponent],
  exports: [BlogCardItemComponent, BlogCardRowComponent],
})
export class AppBlogCards {}
