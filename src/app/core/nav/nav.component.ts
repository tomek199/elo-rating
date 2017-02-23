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

  private sub: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        let tournament_id = this.getTournamentId(event.urlAfterRedirects);
        if (tournament_id) {
          this.getStandardNavbar(tournament_id);
        } else {
          this.getGuestNavbar();
        }
      })
  }

  private getTournamentId(url: String): String {
    let splitted = url.split('/');
    if (splitted[1] == 'tournaments') {
      return splitted[2];
    }
    return undefined;
  }

  private getStandardNavbar(id: String): void {
    this.navbar = [
      {url: `/tournaments/${id}`, title: 'Dashboard'},
      {url: `/rating`, title: 'Rating'},
      {url: `/tournaments/${id}/players`, title: 'Players'}
    ]
  }

  private getGuestNavbar(): void {
    this.navbar = [
      {url: '/tournaments', title: 'Tournament'}
    ]
  }
}
