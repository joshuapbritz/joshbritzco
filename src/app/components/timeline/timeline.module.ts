import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineSectionComponent } from './timeline-section/timeline-section.component';
import { TimelineSectionItemComponent } from './timeline-section-item/timeline-section-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TimelineComponent,
    TimelineSectionComponent,
    TimelineSectionItemComponent,
  ],
  exports: [
    TimelineComponent,
    TimelineSectionComponent,
    TimelineSectionItemComponent,
  ],
})
export class AppTimeline {}
