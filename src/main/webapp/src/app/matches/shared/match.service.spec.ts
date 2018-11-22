import {Match} from 'app/matches/shared/match.model';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {HttpModule} from '@angular/http';
import {inject, TestBed} from '@angular/core/testing';

import {MatchService} from './match.service';
import {Player} from '../../players/shared/player.model';

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
    let queue = prepareQueue();
    expect(service.hasRelatedMatchIncomplete(queue, 0)).toBeFalsy();
    expect(service.hasRelatedMatchIncomplete(queue, 1)).toBeTruthy();
    expect(service.hasRelatedMatchIncomplete(queue, 2)).toBeTruthy();
    expect(service.hasRelatedMatchIncomplete(queue, 3)).toBeFalsy();
  }));

  function prepareQueue(): Match[] {
    let playerOne = new Player('111');
    let playerTwo = new Player('222');
    let playerThree = new Player('333');
    let playerFour = new Player('444');
    let matchOne = new Match();
    matchOne.playerOne = playerOne;
    matchOne.playerTwo = playerTwo;
    let matchTwo = new Match();
    matchTwo.playerOne = playerOne;
    matchTwo.playerTwo = playerTwo;
    let matchThree = new Match();
    matchThree.playerOne = playerTwo;
    matchThree.playerTwo = playerOne;
    let matchFour = new Match();
    matchFour.playerOne = playerThree;
    matchFour.playerTwo = playerFour;
    return [matchOne, matchTwo, matchThree, matchFour]
  }
});
