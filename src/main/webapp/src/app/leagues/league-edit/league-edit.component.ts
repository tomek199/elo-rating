import {LeagueService} from './../shared/league.service';
import {League} from 'app/leagues/shared/league.model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {
  league: League;
  showSuccessAlert: boolean;

  constructor(
    private route: ActivatedRoute,    
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.getLeague();
  }

  private getLeague() {
    this.route.params.map(param => param['league_id'])
    .forEach(leagueId => {
      this.leagueService.getLeague(leagueId)
        .then(response => this.league = response);
    });
  }

  displayWarning(): boolean {
    return this.league === null;
  }

  save() {
    let leagueToUpdate = this.league;
    leagueToUpdate.users = null;
    this.league = undefined;
    this.leagueService.update(leagueToUpdate)
      .then(response => {
        this.league = response;
        this.showSuccessAlert = true;
      });
  }

  closeSuccessAlert() {
    this.showSuccessAlert = false;
  }

  getMaxScores(): number[] {
    return Array.from(Array(10), (value, index) => index + 1);
  }
}
