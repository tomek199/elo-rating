import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { TournamentService } from '../shared/tournament.service';
import { Tournament } from '../shared/tournament.model';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  tournament: Tournament;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map(p => p['tournament_id'])
      .forEach(id => {
        this.tournamentService.getTournament(id)
          .then(tournament => this.tournament = tournament);
      })
  }
}
