import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './core/routing/routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { TournamentAddComponent } from './tournaments/tournament-add/tournament-add.component';
import { TournamentDetailComponent } from './tournaments/tournament-detail/tournament-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TournamentAddComponent,
    TournamentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
