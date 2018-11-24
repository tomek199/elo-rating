import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {By} from '@angular/platform-browser';
import {FeedbackServiceStub} from './../../testing/feedback-stubs';
import {FeedbackService} from './../shared/feedback.service';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {FormsModule} from '@angular/forms';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FeedbackSendComponent} from './feedback-send.component';

describe('FeedbackSendComponent', () => {
  let component: FeedbackSendComponent;
  let fixture: ComponentFixture<FeedbackSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FeedbackSendComponent,
        SpinnerComponent
      ],
      providers: [
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub},
        {provide: FeedbackService, useClass: FeedbackServiceStub}
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should present alert after feedback send', fakeAsync(() => {
    component.ngOnInit();
    let button = fixture.debugElement.query(By.css('form button'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-success'));
    let card = fixture.debugElement.query(By.css('div.card'));
    expect(alert).toBeTruthy();
    expect(card).toBeFalsy();
  }));

  it('should clear textarea after click to alert close button', fakeAsync(() => {
    component.ngOnInit();
    component.showSuccessAlert = true;
    fixture.detectChanges();
    let alertButton = fixture.debugElement.query(By.css('div.alert.alert-success button'));
    alertButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-success'));
    let card = fixture.debugElement.query(By.css('div.card'));
    expect(alert).toBeFalsy();
    expect(card).toBeTruthy();
  }));
});
