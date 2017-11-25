import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        MatchService,
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should ...', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
