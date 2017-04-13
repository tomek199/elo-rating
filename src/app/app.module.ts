import { QueueService } from './queue/shared/queue.service';
import { MatchService } from './matches/shared/match.service';
import { PlayerService } from './players/shared/player.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoutingModule } from './core/routing/routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { LeagueAddComponent } from './leagues/league-add/league-add.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { LeagueService } from './leagues/shared/league.service';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerAddComponent } from './players/player-add/player-add.component';
import { ConfirmModalComponent } from './core/utils/confirm-modal/confirm-modal.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { MatchAddComponent } from './matches/match-add/match-add.component';
import { QueueListComponent } from './queue/queue-list/queue-list.component';
import { LeagueSearchComponent } from './leagues/league-search/league-search.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { PlayerRankingComponent } from './players/player-ranking/player-ranking.component';
import { PlayerMatchesComponent } from './players/player-matches/player-matches.component';

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
    MatchAddComponent,
    QueueListComponent,
    LeagueSearchComponent,
    MatchListComponent,
    PlayerRankingComponent,
    PlayerMatchesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    LeagueService, 
    PlayerService, 
    QueueService,
    MatchService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent],
  
})
export class AppModule { }
