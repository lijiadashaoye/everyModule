import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoChild2Component } from './two-child2.component';

describe('TwoChild2Component', () => {
  let component: TwoChild2Component;
  let fixture: ComponentFixture<TwoChild2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoChild2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
