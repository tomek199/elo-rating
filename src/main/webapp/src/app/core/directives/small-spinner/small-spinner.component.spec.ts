import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SmallSpinnerComponent} from './small-spinner.component';

describe('SmallSpinnerComponent', () => {
  let component: SmallSpinnerComponent;
  let fixture: ComponentFixture<SmallSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
