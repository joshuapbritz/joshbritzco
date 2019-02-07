import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicOfCssComponent } from './magic-of-css.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: MagicOfCssComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MagicOfCssComponent],
})
export class MagicOfCssPost {}
