import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateKeybindServiceComponent } from './create-keybind-service.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSnippets } from 'src/app/components/snippets/snippets.module';

const routes: Routes = [{ path: '', component: CreateKeybindServiceComponent }];

@NgModule({
  imports: [CommonModule, AppSnippets, RouterModule.forChild(routes)],
  declarations: [CreateKeybindServiceComponent],
})
export class CreateKeybindServicePost {}
