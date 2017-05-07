import { QueueListComponent } from './../../queue/queue-list/queue-list.component';
import { Queue } from './../../queue/shared/queue.model';
import { QueueService } from './../../queue/shared/queue.service';
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

  constructor(private router: Router, private queueService: QueueService, private elemRef: ElementRef) {
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.leagueId = this.getLeagueId(event.urlAfterRedirects);
        if (this.leagueId) {
          this.getStandardNavbar(this.leagueId);
        } else {
          this.getGuestNavbar();
        }
      })
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
      { url: `/leagues/${id}`, title: 'Dashboard' },
      { url: `/leagues/${id}/matches`, title: 'Matches' },
      { url: `/leagues/${id}/players`, title: 'Players' }
    ]
  }

  private getGuestNavbar(): void {
    this.navbar = [
      { url: '/leagues', title: 'League' }
    ]
  }

  closeQueueList() {
    let queueListElement = this.elemRef.nativeElement.querySelector('li#queueListDropdown');
    queueListElement.classList.remove('show');
  }

  refreshQueueList() {
    this.queueListComponent.refreshQueue();
  }
}
