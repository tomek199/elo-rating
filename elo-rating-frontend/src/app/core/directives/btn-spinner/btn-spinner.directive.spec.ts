import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSpinnerDirective } from './btn-spinner.directive';

describe('BtnSpinnerComponent', () => {
  let component: BtnSpinnerDirective;
  let fixture: ComponentFixture<BtnSpinnerDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSpinnerDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSpinnerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
