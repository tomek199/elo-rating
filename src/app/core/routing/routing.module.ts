import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TournamentAddComponent } from '../../tournaments/tournament-add/tournament-add.component';

const routes: Routes = [
  {path: '', redirectTo: '/tournament', pathMatch: 'full'},
  {path: '**', redirectTo: '/tournament', pathMatch: 'full'},
  {path: 'tournament', component: TournamentAddComponent}
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
