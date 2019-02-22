import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThingsComponent } from './things.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ThingsComponent],
  exports: [ThingsComponent]
})
export class ThingsModule { }
