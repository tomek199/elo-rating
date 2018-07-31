import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GoogleButtonComponent} from './google-button.component';

describe('GoogleButtonComponent', () => {
  let component: GoogleButtonComponent;
  let fixture: ComponentFixture<GoogleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tests are not added yet. Have to mock Google API (gapi variable).
});
