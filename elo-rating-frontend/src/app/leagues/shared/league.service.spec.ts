import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { LeagueService } from './league.service';

describe('LeagueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        LeagueService,
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should ...', inject([LeagueService], (service: LeagueService) => {
    expect(service).toBeTruthy();
  }));
});
