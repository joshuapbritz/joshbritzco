import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayCardsComponent } from './display-cards.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DisplayCardsComponent],
  exports: [DisplayCardsComponent],
})
export class AppDisplayCards {}
