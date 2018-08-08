import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSectionItemComponent } from './timeline-section-item.component';

describe('TimelineSectionItemComponent', () => {
  let component: TimelineSectionItemComponent;
  let fixture: ComponentFixture<TimelineSectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineSectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineSectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
