import { TestBed, inject } from '@angular/core/testing';

import { PlayerStatsService } from './player-stats.service';
import {GoogleAuthService} from "../../auth/shared/google-auth.service";
import {GoogleAuthServiceStub} from "../../testing/google-stubs";
import {HttpModule} from "@angular/http";

describe('PlayerStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PlayerStatsService,
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    });
  });

  it('should be created', inject([PlayerStatsService], (service: PlayerStatsService) => {
    expect(service).toBeTruthy();
  }));
});
