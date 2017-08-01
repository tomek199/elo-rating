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

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.subscribeRouteChange();
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
}
