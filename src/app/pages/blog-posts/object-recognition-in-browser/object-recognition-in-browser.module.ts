import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ObjectRecognitionInBrowserComponent } from './object-recognition-in-browser.component';
import { AppBlogPostHeader } from 'src/app/components/blog-post-header/blog-post-header.module';
import { AppComingSoon } from 'src/app/components/coming-soon/coming-soon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ObjectRecognitionInBrowserComponent },
    ]),
    AppBlogPostHeader,
    AppComingSoon
  ],
  declarations: [ObjectRecognitionInBrowserComponent],
})
export class ObjectRecognitionInBrowserPost {}
