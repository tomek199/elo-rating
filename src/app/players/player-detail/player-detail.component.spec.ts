import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../shared/player.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PlayerDetailComponent } from './player-detail.component';

describe('PlayerDetailComponent', () => {
  let component: PlayerDetailComponent;
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  function createComponent(playerId: string) {
    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: '123', player_id: playerId};
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent('456');
    expect(component).toBeTruthy();
  }));

  it('should display player details', fakeAsync(() => {
    createComponent('456');
    expect(component.player).toBeTruthy();
  }));

  it('should has tournamentId property', fakeAsync(() => {
    createComponent('456');
    expect(component.tournamentId).toEqual('123');
  }));
});
