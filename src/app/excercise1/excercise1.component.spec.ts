import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Excercise1Component } from './excercise1.component';

describe('Excercise1Component', () => {
  let component: Excercise1Component;
  let fixture: ComponentFixture<Excercise1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Excercise1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Excercise1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
