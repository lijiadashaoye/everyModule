import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeChild2Component } from './three-child2.component';

describe('ThreeChild2Component', () => {
  let component: ThreeChild2Component;
  let fixture: ComponentFixture<ThreeChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
