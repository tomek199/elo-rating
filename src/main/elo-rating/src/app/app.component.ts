import { GoogleAuthService } from './auth/shared/google-auth.service';
import { CookieService } from 'ng2-cookies';
import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  leagueId: string;
  showCookiesWarning: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService, 
    private googleAuthService: GoogleAuthService) {
  }

  ngOnInit() {
    this.subscribeRouteChange();
    this.checkCookies();
  }

  private subscribeRouteChange() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.getLeagueId(event.urlAfterRedirects);
      });
  }

  private getLeagueId(url: string) {
    let splitted = url.split('/');
    if (splitted[1] == 'leagues') 
      this.googleAuthService.setCurrentLeague(splitted[2]);
    else 
      this.googleAuthService.setCurrentLeague(undefined);
    this.leagueId = this.googleAuthService.getCurrentLeague();
  }

  private checkCookies() {
    let cookie: string = this.cookieService.get('cookiesWarningShowed');
    this.showCookiesWarning = (cookie != 'true');
  }

  closeCookiesWarning() {
    this.cookieService.set('cookiesWarningShowed', 'true', 300, '/');
    this.showCookiesWarning = false;
  }
}
