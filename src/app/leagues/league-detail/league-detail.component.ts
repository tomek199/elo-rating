import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { LeagueService } from '../shared/league.service';
import { League } from '../shared/league.model';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  league: League;

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['league_id'])
      .forEach(id => {
        this.leagueService.getLeague(id)
          .then(league => this.league = league);
      })
  }
}
