import { PlayerEditComponent } from './../../players/player-edit/player-edit.component';
import { PlayerDetailComponent } from './../../players/player-detail/player-detail.component';
import { PlayerAddComponent } from './../../players/player-add/player-add.component';
import { PlayerListComponent } from './../../players/player-list/player-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TournamentAddComponent } from '../../tournaments/tournament-add/tournament-add.component';
import { TournamentDetailComponent }  from '../../tournaments/tournament-detail/tournament-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/tournaments', pathMatch: 'full'},
  {path: 'tournaments', component: TournamentAddComponent},
  {path: 'tournaments/:tournament_id', component: TournamentDetailComponent},
  {path: 'tournaments/:tournament_id/players', component: PlayerListComponent},
  {path: 'tournaments/:tournament_id/players/add', component: PlayerAddComponent},
  {path: 'tournaments/:tournament_id/players/:player_id', component: PlayerDetailComponent},
  {path: 'tournaments/:tournament_id/players/:player_id/edit', component: PlayerEditComponent}
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
