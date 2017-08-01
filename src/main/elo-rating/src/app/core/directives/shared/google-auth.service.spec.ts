import { Profile } from './profile.model';
import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
  let sessionStorageMock: Map<string, any> = new Map<string, any>();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthService]
    });

    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return sessionStorageMock.get(key);
    });
  });

  function signIn() {
    let profile = new Profile();
    profile.id = '1234';
    profile.fullName = 'Name LastName';
    profile.givenName = 'Name';
    profile.familyName = 'LastName';
    profile.email = 'lastname@gmail.com';
    profile.imageUrl = '';
    sessionStorageMock.set('profile', JSON.stringify(profile));
    sessionStorageMock.set('token', '1q2w3e4r5t6y7u8i9o');
  }

  function signOut() {
    sessionStorageMock.set('profile', null);
    sessionStorageMock.set('token', null);
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
    expect(service.getProfile()).toBeTruthy();
  }));

  it('getProfile() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signOut();
    expect(service.getProfile()).toBeNull();
  }));

  it('getSessionToken() should return token for signed in user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signIn();
    expect(service.getSessionToken()).toBeTruthy();
  }));

  it('getSessionToken() should return null for signed out user', inject([GoogleAuthService], (service: GoogleAuthService) => {
    signOut();
    expect(service.getSessionToken()).toBeNull();;
  }));
});
