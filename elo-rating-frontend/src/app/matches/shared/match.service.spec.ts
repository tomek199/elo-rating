import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';
import { Match } from './match.model';
import { MATCHES } from '../../testing/data/matches';

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

  it('should check if match is completed in the right order', inject([MatchService], (service: MatchService) => {
    let queue = [ MATCHES[0], MATCHES[1], MATCHES[4], MATCHES[7] ];
    expect(service.hasRelatedMatchIncomplete(queue, 0)).toBeFalsy();
    expect(service.hasRelatedMatchIncomplete(queue, 1)).toBeTruthy();
    expect(service.hasRelatedMatchIncomplete(queue, 2)).toBeTruthy();
    expect(service.hasRelatedMatchIncomplete(queue, 3)).toBeFalsy();
  }));
});
