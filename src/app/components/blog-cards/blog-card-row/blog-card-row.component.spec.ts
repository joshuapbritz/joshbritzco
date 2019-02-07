import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardRowComponent } from './blog-card-row.component';

describe('BlogCardRowComponent', () => {
  let component: BlogCardRowComponent;
  let fixture: ComponentFixture<BlogCardRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCardRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
