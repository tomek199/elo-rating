import { ChartComponentStub } from './../../testing/chart-stubs';
import { MatchServiceStub } from './../../testing/match-stubs';
import { MatchService } from './../../matches/shared/match.service';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { PlayerStatisticsComponent } from './player-statistics.component';

describe('PlayerStatisticsComponent', () => {
  let component: PlayerStatisticsComponent;
  let fixture: ComponentFixture<PlayerStatisticsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ PlayerStatisticsComponent, ChartComponentStub ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: MatchService, useClass: MatchServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerStatisticsComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123', player_id: '111'};
    fixture.detectChanges();
    tick();
  };

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have player id', fakeAsync(() => {
    createComponent();
    expect(component.playerId).toEqual('111');
  }));

  it('should have league id', fakeAsync(() => {
    createComponent();
    expect(component.leagueId).toEqual('123');
  }));

  it('should have rating history chart', fakeAsync(() => {
    createComponent();
    let ratingHistory = component.ratingHistory;
    expect(ratingHistory).toBeTruthy();
    expect(ratingHistory.title.text).toEqual('Rating history');
    expect(ratingHistory.series[0].data.length).toEqual(2);
  }));
});
