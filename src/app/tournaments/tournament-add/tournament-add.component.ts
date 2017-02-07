import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentService } from '../shared/tournament.service';
import { Tournament } from '../shared/tournament.model';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.css']
})
export class TournamentAddComponent implements OnInit {
  tournament: Tournament;

  constructor(private tournamentService: TournamentService, private router: Router) {
    this.tournament = new Tournament();
  }

  ngOnInit() {
  }

  addTournament() {
    this.tournamentService.create(this.tournament)
      .then(tournament => {
        this.router.navigate(['/tournament', tournament.id]);
      });
  }
}
