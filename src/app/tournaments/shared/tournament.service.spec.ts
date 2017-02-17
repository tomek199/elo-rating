/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { TournamentService } from './tournament.service';

describe('TournamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TournamentService]
    });
  });

  it('should ...', inject([TournamentService], (service: TournamentService) => {
    expect(service).toBeTruthy();
  }));
});
