import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {HttpModule} from '@angular/http';
import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
