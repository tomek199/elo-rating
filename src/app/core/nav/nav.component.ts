import { League } from './../../leagues/shared/league.model';
import { LeagueService } from './../../leagues/shared/league.service';
import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = "EloRating";

  navbar;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        let league_id = this.getLeagueId(event.urlAfterRedirects);
        if (league_id) {
          this.getStandardNavbar(league_id);
        } else {
          this.getGuestNavbar();
        }
      })
  }

  private getLeagueId(url: String): String {
    let splitted = url.split('/');
    if (splitted[1] == 'leagues') {
      return splitted[2];
    }
    return undefined;
  }

  private getStandardNavbar(id: String): void {
    this.navbar = [
      {url: `/leagues/${id}`, title: 'Dashboard'},
      {url: `/rating`, title: 'Rating'},
      {url: `/leagues/${id}/players`, title: 'Players'}
    ]
  }

  private getGuestNavbar(): void {
    this.navbar = [
      {url: '/leagues', title: 'League'}
    ]
  }
}
