import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {HttpModule} from '@angular/http';
import {inject, TestBed} from '@angular/core/testing';

import {FeedbackService} from './feedback.service';

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],       
      providers: [
        FeedbackService,
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should be created', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
