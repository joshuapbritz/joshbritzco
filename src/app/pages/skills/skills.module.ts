import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { Routes, RouterModule } from '@angular/router';
import { AppTimeline } from 'src/app/components/timeline/timeline.module';

const routes: Routes = [{ path: '', component: SkillsComponent }];

@NgModule({
  imports: [CommonModule, AppTimeline, RouterModule.forChild(routes)],
  declarations: [SkillsComponent],
})
export class SkillsPageModule {}
