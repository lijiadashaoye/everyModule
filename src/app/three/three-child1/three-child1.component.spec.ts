import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeChild1Component } from './three-child1.component';

describe('ThreeChild1Component', () => {
  let component: ThreeChild1Component;
  let fixture: ComponentFixture<ThreeChild1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeChild1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
