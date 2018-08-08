import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarouselItemComponent } from './brand-carousel-item.component';

describe('BrandCarouselItemComponent', () => {
  let component: BrandCarouselItemComponent;
  let fixture: ComponentFixture<BrandCarouselItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarouselItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
