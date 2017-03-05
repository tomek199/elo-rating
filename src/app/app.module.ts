import { DailyQueueService } from './daily-queue/daily-queue.service';
import { PlayerService } from './players/shared/player.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RoutingModule } from './core/routing/routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { TournamentAddComponent } from './tournaments/tournament-add/tournament-add.component';
import { TournamentDetailComponent } from './tournaments/tournament-detail/tournament-detail.component';
import { TournamentService } from './tournaments/shared/tournament.service';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { PlayerAddComponent } from './players/player-add/player-add.component';
import { DailyQueueComponent } from './daily-queue/daily-queue.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TournamentAddComponent,
    TournamentDetailComponent,
    PlayerListComponent,
    PlayerAddComponent,
    DailyQueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    TournamentService, 
    PlayerService, 
    DailyQueueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
