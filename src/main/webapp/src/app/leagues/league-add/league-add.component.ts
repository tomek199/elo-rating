import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LeagueService} from '../shared/league.service';
import {League} from '../shared/league.model';

@Component({
  selector: 'app-league-add',
  templateUrl: './league-add.component.html',
  styleUrls: ['./league-add.component.css']
})
export class LeagueAddComponent implements OnInit {
  league: League;

  constructor(private leagueService: LeagueService, private router: Router) {
    this.league = new League();
  }

  ngOnInit() {
  }

  addLeague() {
    this.leagueService.create(this.league)
      .then(league => {
        this.router.navigate(['/leagues', league.id]);
      });
  }
}
