import { LeagueService } from './../shared/league.service';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { League } from 'app/leagues/shared/league.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {
  league: League;
  showSuccessAlert: boolean;

  constructor(
    private googleAuthService: GoogleAuthService, 
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.showSuccessAlert = false;
    this.getLeague();
  }

  private getLeague() {
    let leagueId = this.googleAuthService.getCurrentLeagueId();
    this.leagueService.getLeague(leagueId)
      .then(response => this.league = response);
  }

  displayWarning(): boolean {
    return this.league === null;
  }

  save() {
    let leagueToUpdate = this.league;
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
}
