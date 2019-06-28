import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from './contact-me.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ContactMeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ContactMeComponent }]),
  ],
  exports: [ContactMeComponent],
})
export class ContactMeModule {}
