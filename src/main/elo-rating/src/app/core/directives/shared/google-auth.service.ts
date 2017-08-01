import { Injectable } from '@angular/core';
import { Profile } from "app/core/directives/shared/profile.model";

@Injectable()
export class GoogleAuthService {
  private readonly PROFILE = 'profile';
  private readonly TOKEN = 'token';

  constructor() { }

  isAuthenticated(): boolean {
    let profile = sessionStorage.getItem(this.PROFILE);
    let token = sessionStorage.getItem(this.TOKEN);
    return profile !== null && token !== null;
  }

  getProfile(): Profile {
    let profile = sessionStorage.getItem(this.PROFILE);
    return JSON.parse(profile);
  }

  getSessionToken(): string {
    return sessionStorage.getItem(this.TOKEN);
  }
}
