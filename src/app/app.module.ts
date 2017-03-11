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
import { ConfirmModalComponent } from './core/utils/confirm-modal/confirm-modal.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TournamentAddComponent,
    TournamentDetailComponent,
    PlayerListComponent,
    PlayerAddComponent,
    ConfirmModalComponent,
    PlayerDetailComponent,
    PlayerEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    NgbModule.forRoot()
  ],
  providers: [TournamentService, PlayerService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent]
})
export class AppModule { }
