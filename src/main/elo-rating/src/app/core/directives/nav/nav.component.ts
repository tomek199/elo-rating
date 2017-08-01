import { CookieService } from 'ng2-cookies';
import { QueueListComponent } from './../../../queue/queue-list/queue-list.component';
import { League } from './../../../leagues/shared/league.model';
import { Component, Input, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnChanges {

  @ViewChild(QueueListComponent)
  private queueListComponent: QueueListComponent;
  title = "EloRating";
  @Input() leagueId: string;
  navbar;
  showCookiesWarning: boolean;

  constructor(
    private cookieService: CookieService) {
  }

  ngOnChanges() {
    this.generateNavbar();
  }

  private checkCookies() {
    let cookie: string = this.cookieService.get('cookiesWarningShowed');
    this.showCookiesWarning = (cookie != 'true');
  }

  private generateNavbar() {
    if (this.leagueId) {
      this.getStandardNavbar(this.leagueId);
    } else {
      this.getGuestNavbar();
    }
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
