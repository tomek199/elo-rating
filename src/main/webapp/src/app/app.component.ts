import {LeagueService} from './leagues/shared/league.service';
import {GoogleAuthService} from './auth/shared/google-auth.service';
import {CookieService} from 'ng2-cookies';
import {NavigationEnd, Router} from '@angular/router';
import {Component} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  leagueId: string;
  showCookiesWarning: boolean;
  showNavbar: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService, 
    private leagueService: LeagueService,
    private googleAuthService: GoogleAuthService) {
  }

  ngOnInit() {
    this.subscribeRouteChange();
    this.checkCookies();
  }

  private subscribeRouteChange() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = false;
        let leagueId = this.getLeagueId(event.urlAfterRedirects);
        this.getLeague(leagueId);
      });
  }

  private getLeagueId(url: string) {
    let splitted = url.split('/');
    if (splitted[1] == 'leagues') {
      this.showNavbar = true;
      return this.checkLeagueId(splitted[2]);
    }
    return null;
  }

  private checkLeagueId(id: string): string | null {
    if (!id) return null;
    let regex = new RegExp('^[a-f\\d]{24}$');
    if (regex.test(id))
      return id;
    else
      return null;
  }

  private getLeague(leagueId: string) {
    if (this.leagueId != leagueId) {
      this.leagueService.getLeague(leagueId)
        .then(league => {
          this.googleAuthService.setCurrentLeague(league);
          this.leagueId = leagueId;
        });
    }
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
