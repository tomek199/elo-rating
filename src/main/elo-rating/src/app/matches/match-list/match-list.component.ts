import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './../../core/utils/confirm-modal/confirm-modal.component';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from './../shared/match.service';
import { Match } from './../shared/match.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  leagueId: string;
  playedMatches: Match[];
  scheduledMatches: Match[];

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getLeagueId();
    this.getMatches();
  }

  getLeagueId() {
    this.route.params.map(param => param['league_id'])
      .forEach(league_id => this.leagueId = league_id);
  }

  getMatches() {
    this.matchService.getMatches(this.leagueId)
      .then(matches => {
        this.playedMatches = matches.filter(m => this.isComplete(m.scores));
        this.scheduledMatches = matches.filter(m => !this.isComplete(m.scores));
      });
  }

  isComplete(scores: {[id: string] : number;}): boolean {
    return Object.keys(scores).length > 0;
  }

  hasMatches(): boolean {
    return (this.hasPlayedMatches() || this.hasScheduledMatches());
  }

  hasPlayedMatches(): boolean {
    return (this.playedMatches != undefined && this.playedMatches.length > 0);    
  }

  hasScheduledMatches(): boolean {
    return (this.scheduledMatches != undefined && this.scheduledMatches.length > 0);    
  }

  getScore(index: number, player: Player): number {
    let key = player ? player.id : '';
    return this.playedMatches[index].scores[key];
  }

  isWinner(index: number, player: Player) {
    if (player) {
      return this.playedMatches[index].scores[player.id] == 2;
    } else {
      return this.checkIfDeletedIsWinner(index);
    }
  }

  private checkIfDeletedIsWinner(index: number) {
    let match = this.playedMatches[index];
    let player = [match.playerOne, match.playerTwo].find(player => player != undefined);
    if (player != undefined) {
      return match.scores[player.id] != 2;
    } else {
      return false;
    }
  }

  hasBothPlayersDeleted(index: number) {
    let match = this.playedMatches[index];
    return !match.playerOne && !match.playerTwo;
  }

  openDeleteModal(matchId: string): void {
    let modal = this.modalService.open(ConfirmModalComponent);
    modal.componentInstance.text = `Are you sure you want to delete match?`;
    modal.result.then((result) => {
      if (result) {
        this.delete(matchId);
      }
    })
  }

  delete(matchId: string) {
    this.matchService.delete(matchId)
      .then(result => {
        if (result) {
          this.getMatches();
        }
      });
  }

  goToMatch(matchId: string) {
    this.router.navigate(['/leagues', this.leagueId, 'matches', 'add', matchId]);
  }
}
