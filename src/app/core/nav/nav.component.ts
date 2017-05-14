import { QueueListComponent } from './../../queue/queue-list/queue-list.component';
import { Queue } from './../../queue/shared/queue.model';
import { League } from './../../leagues/shared/league.model';
import { LeagueService } from './../../leagues/shared/league.service';
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

  constructor(
    private router: Router,
    private elemRef: ElementRef) {
  }

  ngOnInit() {
    this.generateNavbar();
  }

  generateNavbar() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.getNavbar(event.urlAfterRedirects);
      });
  }

  private getNavbar(urlAfterRedirects: string) {
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

  closeQueueList() {
    let queueListElement = this.elemRef.nativeElement.querySelector('li#queueListDropdown');
    if (queueListElement.classList.contains('show')) {
      queueListElement.classList.remove('show');
    }
  }

  refreshQueueList() {
    this.queueListComponent.refreshQueue();
    this.queueListComponent.setTimepickerTime();
  }
}
