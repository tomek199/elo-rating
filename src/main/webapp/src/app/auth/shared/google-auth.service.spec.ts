import {League} from '../../leagues/shared/league.model';
import {Player} from '../../players/shared/player.model';
import {inject, TestBed} from '@angular/core/testing';

import {GoogleAuthService} from './google-auth.service';
import {User} from "../../users/shared/user.model";

describe('GoogleAuthService', () => {
  let sessionStorageMock: Map<string, any> = new Map<string, any>();
  beforeEach(() => {
    sessionStorageMock.clear();
    TestBed.configureTestingModule({
      providers: [GoogleAuthService]
    });

    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return sessionStorageMock.get(key);
    });

    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      sessionStorageMock.set(key, value);
    });

    signOut();
    setLeague(null);
  });

  function signIn() {
    let user = new User();
    user.id = '1234';
    user.name = 'Name LastName';
    user.givenName = 'Name';
    user.familyName = 'LastName';
    user.email = 'lastname@gmail.com';
    user.pictureUrl = '';
    let league = new League('123', 'Test league');
    user.leagues = [];
    user.leagues.push(league);
    let player = new Player('456', 'Test player');
    player.league = league;
    user.players = [];
    user.players.push(player, new Player('789'));
    sessionStorageMock.set('user', JSON.stringify(user));
    sessionStorageMock.set('token', '1q2w3e4r5t6y7u8i9o');
  }

  function signOut() {
    sessionStorageMock.set('user', null);
    sessionStorageMock.set('token', null);
  }

  function setLeague(league: League | null) {
    sessionStorageMock.set('league', JSON.stringify(league));
  }

  it('should be created', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('isAuthenticated() should return true for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.isAuthenticated()).toBeTruthy();
  }));

  it('isAuthenticated() should return false for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service.isAuthenticated()).toBeFalsy();
  }));

  it('getCurrentUser() should return User for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.getCurrentUser()).toBeTruthy();
  }));

  it('getCurrentUser() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service.getCurrentUser()).toBeNull();
  }));

  it('getSessionToken() should return token for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.getIdToken()).toBeTruthy();
  }));

  it('getSessionToken() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service.getIdToken()).toBeNull();
  }));

  it('getCurrentLeague() should return league when league is selected', inject([GoogleAuthService], (service: GoogleAuthService) => {
    let league = new League('123', 'Test league');
    setLeague(league);
    expect(service.getCurrentLeague().id).toEqual(league.id);
    expect(service.getCurrentLeague().name).toEqual(league.name);
  }));

  it('getCurrentLeague() should return null when league is not selected', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service.getCurrentLeague()).toBeNull();
  }));

  it('setCurrentLeague() should set current league id and store it in sessionStorage', inject([GoogleAuthService], (service: GoogleAuthService) => {
    let league = new League('987', 'Test league');
    service.setCurrentLeague(league);
    expect(service.getCurrentLeague().name).toEqual(league.name);
  }));

  it('isAuthorized() should return true for authorized user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    let league = new League('123', 'Test league');    
    setLeague(league);
    expect(service.isAuthorized()).toBeTruthy();
  }));

  it('isAuthorized() should return false for not authorized user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    let league = new League('987', 'Test league');    
    setLeague(league);
    expect(service.isAuthorized()).toBeFalsy();    
  }));

  it('isAuthorized() should return false for not authenticated user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    let league = new League('123', 'Test league');    
    setLeague(league);
    expect(service.isAuthorized()).toBeFalsy();    
  }));

  it('isAuthorized() should return false for not selected league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    setLeague(null);
    expect(service.isAuthorized()).toBeFalsy();    
  }));

  it('isLeagueAssigned() should return true for assigned league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    let league = new League('123', 'Test league');
    let user = new User();
    league.users = [];
    league.users.push(user);
    setLeague(league);
    expect(service.isLeagueAssigned()).toBeTruthy();
  }));

  it('isLeagueAssigned() should return false for not assigned league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    let league = new League('123', 'Test league');
    setLeague(league);
    expect(service.isLeagueAssigned()).toBeFalsy();
  }));

  it('isLeagueAssigned() should return false for not selected league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service.isLeagueAssigned()).toBeFalsy();    
  }));

  it('getCurrentPlayerId() should return id when user is connected to player for current league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    setLeague(new League('123'));
    expect(service.getCurrentPlayerId()).toEqual('456');
  }));

  it('getCurrentPlayerId() should return null when user is not connected to player for current league', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    setLeague(new League('321'));
    expect(service.getCurrentPlayerId()).toBeNull();
  }));
});
