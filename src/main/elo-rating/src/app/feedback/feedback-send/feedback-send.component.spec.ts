import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSendComponent } from './feedback-send.component';

describe('FeedbackSendComponent', () => {
  let component: FeedbackSendComponent;
  let fixture: ComponentFixture<FeedbackSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSendComponent ]
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
});
