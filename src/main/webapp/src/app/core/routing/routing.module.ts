import {LeagueWelcomeComponent} from './../../leagues/league-welcome/league-welcome.component';
import {UserProfileComponent} from './../../users/user-profile/user-profile.component';
import {LeagueEditComponent} from './../../leagues/league-edit/league-edit.component';
import {FeedbackSendComponent} from './../../feedback/feedback-send/feedback-send.component';
import {AuthGuardService} from './../../auth/shared/auth-guard.service';
import {UserConfirmInvitationComponent} from './../../users/user-confirm-invitation/user-confirm-invitation.component';
import {UserInviteComponent} from './../../users/user-invite/user-invite.component';
import {PlayerRankingComponent} from './../../players/player-ranking/player-ranking.component';
import {MatchListComponent} from './../../matches/match-list/match-list.component';
import {MatchSaveComponent} from './../../matches/match-save/match-save.component';
import {PlayerEditComponent} from './../../players/player-edit/player-edit.component';
import {PlayerDetailComponent} from './../../players/player-detail/player-detail.component';
import {PlayerAddComponent} from './../../players/player-add/player-add.component';
import {PlayerListComponent} from './../../players/player-list/player-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LeagueDetailComponent} from '../../leagues/league-detail/league-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leagues', pathMatch: 'full' },
  { path: 'leagues', component: LeagueWelcomeComponent },
  { path: 'leagues/:league_id', component: LeagueDetailComponent },
  { path: 'leagues/:league_id/edit', component: LeagueEditComponent, canActivate: [AuthGuardService]},
  { path: 'leagues/:league_id/players', component: PlayerListComponent },
  { path: 'leagues/:league_id/players/ranking', component: PlayerRankingComponent },
  { path: 'leagues/:league_id/players/add', component: PlayerAddComponent, canActivate: [ AuthGuardService ] },
  { path: 'leagues/:league_id/players/:player_id', component: PlayerDetailComponent },
  { path: 'leagues/:league_id/players/:player_id/edit', component: PlayerEditComponent, canActivate: [ AuthGuardService ] },
  { path: 'leagues/:league_id/matches/add', component: MatchSaveComponent, canActivate: [ AuthGuardService ] },
  { path: 'leagues/:league_id/matches/save/:match_id/:mode', component: MatchSaveComponent, canActivate: [ AuthGuardService ] },
  { path: 'leagues/:league_id/matches', component: MatchListComponent },
  { path: 'leagues/:league_id/users/invite', component: UserInviteComponent, canActivate: [ AuthGuardService ]},
  { path: 'leagues/:league_id/users/profile', component: UserProfileComponent },
  { path: 'leagues/users/profile', component: UserProfileComponent },
  { path: 'users/confirm-invitation/:token', component: UserConfirmInvitationComponent },
  { path: 'leagues/feedback/send', component: FeedbackSendComponent },
  { path: '**', redirectTo: '/leagues', pathMatch: 'full' } // this path must be the last one
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
