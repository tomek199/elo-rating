import { GoogleAuthService } from './google-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private googleAuthService: GoogleAuthService
  ) { }

  canActivate(): boolean {
    let isLeagueAssign = this.googleAuthService.isLeagueAssigned();
    let isAuthorized = this.googleAuthService.isAuthorized();
    console.log('auth-guard called');    
    if (!isLeagueAssign || isAuthorized) {
      return true;
    } else {
      this.router.navigate(['/leagues']);
      return false;
    }
  }
}
