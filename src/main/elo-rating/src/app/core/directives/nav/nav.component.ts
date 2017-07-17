import { CookieService } from 'ng2-cookies';
import { QueueListComponent } from './../../../queue/queue-list/queue-list.component';
import { League } from './../../../leagues/shared/league.model';
import { LeagueService } from './../../../leagues/shared/league.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild(QueueListComponent)
  private queueListComponent: QueueListComponent;
  title = "EloRating";
  navbar;
  leagueId: string;
  showCookiesWarning: boolean;

  constructor(
    private router: Router,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.subscribeRouteChange();
  }

  subscribeRouteChange() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.checkCookies();
        this.generateNavbar(event.urlAfterRedirects);
      });
  }

  private checkCookies() {
    let cookie: string = this.cookieService.get('cookiesWarningShowed');
    this.showCookiesWarning = (cookie != 'true');
  }

  private generateNavbar(urlAfterRedirects: string) {
    this.leagueId = this.getLeagueId(urlAfterRedirects);
    if (this.leagueId) {
      this.getStandardNavbar(this.leagueId);
    } else {
      this.getGuestNavbar();
    }
  }

  private getLeagueId(url: string): string {
    let splitted = url.split('/');
    if (splitted[1] == 'leagues') {
      return splitted[2];
    }
    return undefined;
  }

  private getStandardNavbar(id: String): void {
    this.navbar = [
      {
        url: ['/leagues', id],
        title: 'Dashboard'
      },
      {
        url: ['/leagues', id, 'matches'],
        title: 'Matches'
      },
      {
        url: ['/leagues', id, 'players'],
        title: 'Players'
      }
    ]
  }

  private getGuestNavbar(): void {
    this.navbar = [
      {
        url: ['/leagues'],
        title: 'League'
      }
    ]
  }

  refreshQueueList() {
    this.queueListComponent.refreshQueue();
  }

  closeCookiesWarning() {
    this.cookieService.set('cookiesWarningShowed', 'true', 300, '/');
    this.showCookiesWarning = false;
  }
}
