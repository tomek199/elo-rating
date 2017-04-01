import { PlayerRankingComponent } from './../../players/player-ranking/player-ranking.component';
import { MatchListComponent } from './../../matches/match-list/match-list.component';
import { MatchAddComponent } from './../../matches/match-add/match-add.component';
import { PlayerEditComponent } from './../../players/player-edit/player-edit.component';
import { PlayerDetailComponent } from './../../players/player-detail/player-detail.component';
import { PlayerAddComponent } from './../../players/player-add/player-add.component';
import { PlayerListComponent } from './../../players/player-list/player-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeagueAddComponent } from '../../leagues/league-add/league-add.component';
import { LeagueDetailComponent }  from '../../leagues/league-detail/league-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/leagues', pathMatch: 'full'},
  {path: 'leagues', component: LeagueAddComponent},
  {path: 'leagues/:league_id', component: LeagueDetailComponent},
  {path: 'leagues/:league_id/players', component: PlayerListComponent},
  {path: 'leagues/:league_id/players/ranking', component: PlayerRankingComponent},
  {path: 'leagues/:league_id/players/add', component: PlayerAddComponent},
  {path: 'leagues/:league_id/players/:player_id', component: PlayerDetailComponent},
  {path: 'leagues/:league_id/players/:player_id/edit', component: PlayerEditComponent},
  {path: 'leagues/:league_id/matches/add', component: MatchAddComponent},
  {path: 'leagues/:league_id/matches', component: MatchListComponent},
  {path: '**', redirectTo: '/leagues', pathMatch: 'full'} // this path must be the last one
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
