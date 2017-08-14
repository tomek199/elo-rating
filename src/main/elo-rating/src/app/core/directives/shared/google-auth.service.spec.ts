import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';
import { User } from "../../../users/shared/user.model";

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
  });

  function signIn() {
    let user = new User();
    user.id = '1234';
    user.name = 'Name LastName';
    user.givenName = 'Name';
    user.familyName = 'LastName';
    user.email = 'lastname@gmail.com';
    user.pictureUrl = '';
    sessionStorageMock.set('user', JSON.stringify(user));
    sessionStorageMock.set('token', '1q2w3e4r5t6y7u8i9o');
  }

  function signOut() {
    sessionStorageMock.set('user', null);
    sessionStorageMock.set('token', null);
  }

  function setLeague(leagueId: string | null) {
    sessionStorageMock.set('league', leagueId);
  }

  it('should be created', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('isAuthenticated() should return true for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.isAuthenticated()).toBeTruthy();
  }));

  it('isAuthenticated() should return false for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signOut();
    expect(service.isAuthenticated()).toBeFalsy();
  }));

  it('getProfile() should return profile for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.getUser()).toBeTruthy();
  }));

  it('getProfile() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signOut();
    expect(service.getUser()).toBeNull();
  }));

  it('getSessionToken() should return token for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.getIdToken()).toBeTruthy();
  }));

  it('getSessionToken() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signOut();
    expect(service.getIdToken()).toBeNull();
  }));

  it('getCurrentLeague() should return league id when league is selected', inject([GoogleAuthService], (service: GoogleAuthService) => {
    setLeague('123');
    expect(service.getCurrentLeague()).toEqual('123');
  }));

  it('getCurrentLeague() should return null when league is not selected', inject([GoogleAuthService], (service: GoogleAuthService) => {
    setLeague(null);
    expect(service.getCurrentLeague()).toBeNull();
  }));

  it('setCurrentLeague() should set current league id and store it in sessionStorage', inject([GoogleAuthService], (service: GoogleAuthService) => {
    service.setCurrentLeague('987');
    expect(service.getCurrentLeague()).toEqual('987');
  }));
});
