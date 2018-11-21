import {CommonService} from './core/shared/common.service';
import {FeedbackService} from './feedback/shared/feedback.service';
import {AuthGuardService} from './auth/shared/auth-guard.service';
import {UserService} from './users/shared/user.service';
import {GoogleAuthService} from './auth/shared/google-auth.service';
import {MatchService} from './matches/shared/match.service';
import {PlayerService} from './players/shared/player.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartModule} from 'angular2-highcharts';
import {CookieService} from 'ng2-cookies';
import {OrderModule} from 'ngx-order-pipe';

import {RoutingModule} from './core/routing/routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './core/directives/nav/nav.component';
import {LeagueAddComponent} from './leagues/league-add/league-add.component';
import {LeagueDetailComponent} from './leagues/league-detail/league-detail.component';
import {LeagueService} from './leagues/shared/league.service';
import {PlayerListComponent} from './players/player-list/player-list.component';
import {PlayerAddComponent} from './players/player-add/player-add.component';
import {ConfirmModalComponent} from './core/directives/confirm-modal/confirm-modal.component';
import {PlayerDetailComponent} from './players/player-detail/player-detail.component';
import {PlayerEditComponent} from './players/player-edit/player-edit.component';
import {MatchSaveComponent} from './matches/match-save/match-save.component';
import {QueueListComponent} from './queue/queue-list/queue-list.component';
import {LeagueSearchComponent} from './leagues/league-search/league-search.component';
import {MatchListComponent} from './matches/match-list/match-list.component';
import {PlayerRankingComponent} from './players/player-ranking/player-ranking.component';
import {PlayerMatchesComponent} from './players/player-matches/player-matches.component';
import {PlayerStatisticsComponent} from './players/player-statistics/player-statistics.component';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {SmallSpinnerComponent} from './core/directives/small-spinner/small-spinner.component';
import {PageSizeComponent} from './core/directives/page-size/page-size.component';
import {PlayerForecastComponent} from './players/player-forecast/player-forecast.component';
import {PlayerCellComponent} from './players/player-cell/player-cell.component';
import {SpinnerComponent} from './core/directives/spinner/spinner.component';
import {GoogleAuthComponent} from './auth/google-auth/google-auth.component';
import {PlayerOpponentsComponent} from './players/player-opponents/player-opponents.component';
import {LeagueAssignComponent} from './leagues/league-assign/league-assign.component';
import {UserInviteComponent} from './users/user-invite/user-invite.component';
import {GoogleButtonComponent} from './auth/google-button/google-button.component';
import {UserConfirmInvitationComponent} from './users/user-confirm-invitation/user-confirm-invitation.component';
import {UserCreatePlayerComponent} from './users/user-create-player/user-create-player.component';
import {FeedbackSendComponent} from './feedback/feedback-send/feedback-send.component';
import {LeagueEditComponent} from './leagues/league-edit/league-edit.component';
import {BtnSpinnerDirective} from './core/directives/btn-spinner/btn-spinner.directive';
import {PlayerUserInfoComponent} from './players/player-user-info/player-user-info.component';
import {UserProfileComponent} from './users/user-profile/user-profile.component';
import {UserProfileInfoComponent} from './users/user-profile-info/user-profile-info.component';
import {UserProfileLeaguesComponent} from './users/user-profile-leagues/user-profile-leagues.component';
import {LeagueWelcomeComponent} from './leagues/league-welcome/league-welcome.component';
import {UserProfileEmailsNotificationsComponent}
  from './users/user-profile-emails-notifications/user-profile-emails-notifications.component';
import {UiSwitchModule} from 'angular2-ui-switch';
import {RodoComponent} from './core/rodo/rodo.component';
import {PlayerStatsService} from './players/shared/player-stats.service';
import { OcticonDirective } from './core/directives/octicon/octicon.directive';
import {CollapseModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LeagueAddComponent,
    LeagueDetailComponent,
    PlayerListComponent,
    PlayerAddComponent,
    ConfirmModalComponent,
    PlayerDetailComponent,
    PlayerEditComponent,
    MatchSaveComponent,
    QueueListComponent,
    LeagueSearchComponent,
    MatchListComponent,
    PlayerRankingComponent,
    PlayerMatchesComponent,
    PlayerStatisticsComponent,
    SmallSpinnerComponent,
    PageSizeComponent,
    PlayerForecastComponent,
    PlayerCellComponent,
    SpinnerComponent,
    GoogleAuthComponent,
    PlayerOpponentsComponent,
    LeagueAssignComponent,
    UserInviteComponent,
    GoogleButtonComponent,
    UserConfirmInvitationComponent,
    UserCreatePlayerComponent,
    FeedbackSendComponent,
    LeagueEditComponent,
    BtnSpinnerDirective,
    PlayerUserInfoComponent,
    UserProfileComponent,
    UserProfileInfoComponent,
    UserProfileLeaguesComponent,
    LeagueWelcomeComponent,
    UserProfileLeaguesComponent,
    UserProfileEmailsNotificationsComponent,
    RodoComponent,
    OcticonDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgbModule.forRoot(),
    ChartModule,
    OrderModule,
    UiSwitchModule,
    CollapseModule
  ],
  providers: [
    LeagueService,
    PlayerService,
    MatchService,
    CookieService,
    GoogleAuthService,
    UserService,
    AuthGuardService,
    FeedbackService,
    PlayerStatsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    CommonService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent],

})
export class AppModule { }

export function highchartsFactory() {
  const highcharts = require('highcharts');
  return highcharts;
}
