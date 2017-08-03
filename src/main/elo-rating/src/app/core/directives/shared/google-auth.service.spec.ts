import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';
import { User } from "../../../users/shared/user.model";

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
    expect(service.getIdToken()).toBeNull();;
  }));
});
