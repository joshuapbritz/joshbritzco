import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule],
  entryComponents: [ToastComponent],
  providers: [ToastService],
  exports: [],
})
export class AppToast {}
