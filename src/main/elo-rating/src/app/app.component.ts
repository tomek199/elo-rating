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
    private cookieService: CookieService) {
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
      this.leagueId = splitted[2];
    else 
      this.leagueId = undefined;
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
