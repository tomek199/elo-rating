import {GoogleAuthService} from './../../../auth/shared/google-auth.service';
import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnChanges {
  title = 'EloRating';
  @Input() leagueId: string;
  navbar;

  isCollapsed = true;

  constructor(private googleAuthService: GoogleAuthService) { }

  ngOnChanges() {
    this.generateNavbar();
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

  isAuthorized(): boolean {
    let authorized = !this.googleAuthService.isLeagueAssigned() || this.googleAuthService.isAuthorized();
    return (this.leagueId && authorized);
  }
}
