import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { AppBlogCards } from 'src/app/components/blog-cards/blog-cards.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogComponent,
      },
      {
        path: ':slug',
        component: PostComponent,
      },
    ]),
    AppBlogCards,
  ],
  declarations: [BlogComponent, PostComponent],
  exports: [BlogComponent, PostComponent],
})
export class BlogModule {}
