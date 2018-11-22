import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './google-auth.service';
import {RouterStub} from './../../testing/routing-stubs';
import {Router} from '@angular/router';
import {inject, TestBed} from '@angular/core/testing';

import {AuthGuardService} from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        {provide: Router, useClass: RouterStub},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
