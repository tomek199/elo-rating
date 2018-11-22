import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {League} from './../shared/league.model';
import {LeagueService} from './../shared/league.service';
import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
import {of} from "rxjs";

@Component({
  selector: 'app-league-search',
  templateUrl: './league-search.component.html',
  styleUrls: ['./league-search.component.css']
})
export class LeagueSearchComponent implements OnInit {

  @Input() size: string = 'md';
  league: League;
  leagues: Observable<League[]>;

  constructor(
    private leagueService: LeagueService,
    private router: Router) { }

  ngOnInit() {
    this.league = new League();
  }

  goToLeague() {
    let url = ['/leagues', this.league.id];
    this.router.navigate(url);
    this.league = new League();
  }

  searchLeague = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length > 1
      ? this.leagueService.findByName(term)
      : of([]))

  leagueFormatter(league: League): string {
    return league.name ? league.name : '';
  }

  leagueFound() {
    return this.league.name != null ? true : false;
  }
}
