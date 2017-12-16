import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSpinnerComponent } from './btn-spinner.component';

describe('BtnSpinnerComponent', () => {
  let component: BtnSpinnerComponent;
  let fixture: ComponentFixture<BtnSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
