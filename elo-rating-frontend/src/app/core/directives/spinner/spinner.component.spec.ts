import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpinnerComponent} from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner for undefined resource', () => {
    component.resource = undefined;
    component.ngOnChanges();    
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div img'));
    expect(debugElement).toBeTruthy();
  })

  it('should hide spinner for not undefined resource', () => {
    component.resource = [1, 2, 3];
    component.ngOnChanges();
    fixture.detectChanges();    
    let debugElement = fixture.debugElement.query(By.css('div img'));
    expect(debugElement).toBeFalsy();
  });
});
