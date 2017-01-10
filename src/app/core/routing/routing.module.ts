import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TournamentAddComponent } from '../../tournaments/tournament-add/tournament-add.component';
import { TournamentDetailComponent }  from '../../tournaments/tournament-detail/tournament-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/tournament', pathMatch: 'full'},
  {path: 'tournament', component: TournamentAddComponent},
  {path: 'tournament/:tournament_id', component: TournamentDetailComponent}
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
