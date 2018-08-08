import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCarouselComponent } from './brand-carousel.component';

describe('BrandCarouselComponent', () => {
  let component: BrandCarouselComponent;
  let fixture: ComponentFixture<BrandCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
