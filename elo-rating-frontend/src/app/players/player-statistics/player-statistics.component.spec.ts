import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../shared/player.service';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartComponentStub} from './../../testing/chart-stubs';
import {MatchServiceStub} from './../../testing/match-stubs';
import {MatchService} from './../../matches/shared/match.service';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {ActivatedRoute} from '@angular/router';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PlayerStatisticsComponent} from './player-statistics.component';

describe('PlayerStatisticsComponent', () => {
  let component: PlayerStatisticsComponent;
  let fixture: ComponentFixture<PlayerStatisticsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ 
        PlayerStatisticsComponent, 
        ChartComponentStub, 
        SpinnerComponent
      ],
      imports: [ NgbModule.forRoot(), FormsModule ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: MatchService, useClass: MatchServiceStub},
        {provide: PlayerService, useClass: PlayerServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent(playerId = '111') {
    fixture = TestBed.createComponent(PlayerStatisticsComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123', player_id: playerId};
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

  it('should have rating history chart data', fakeAsync(() => {
    createComponent();
    let ratingHistory = component.ratingHistory;
    expect(ratingHistory).toBeTruthy();
    expect(ratingHistory.title.text).toEqual('Rating history');
    expect(ratingHistory.series[0].data.length).toEqual(3);
  }));

  it('should present rating history chart', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.card div.card-body div.row div.col-8 chart'));    
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should have matches history chart data', fakeAsync(() => {
    createComponent();
    let matchesStats = component.matchesStats;
    expect(matchesStats.title).toEqual('Matches statistics');
    expect(matchesStats.series[0].name).toEqual('Won matches');
    expect(matchesStats.series[0].data.value).toEqual(1);
    expect(matchesStats.series[0].data.max).toEqual(3);
    expect(matchesStats.series[1].name).toEqual('Lost matches')
    expect(matchesStats.series[1].data.value).toEqual(2);
    expect(matchesStats.series[1].data.max).toEqual(3);
    expect(matchesStats.series[2].name).toEqual('Percentage of winnings');
    expect(matchesStats.series[2].data.value).toEqual(33);
    expect(matchesStats.series[2].data.max).toEqual(100);
    expect(matchesStats.series[3].name).toEqual('Sets won');
    expect(matchesStats.series[3].data.value).toEqual(3);
    expect(matchesStats.series[3].data.max).toEqual(7);
    expect(matchesStats.series[4].name).toEqual('Sets lost');
    expect(matchesStats.series[4].data.value).toEqual(4);
    expect(matchesStats.series[4].data.max).toEqual(7);
  }));

  it('should display alert if chart for current period is empty', fakeAsync(() => {
    createComponent();
    component.ratingHistory.series[0].data = [];
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.card div.card-body div.row div.col-8 div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }))

  it('should display alert if matches list is empty', fakeAsync(() => {
    createComponent('555');
    fixture.detectChanges();
    expect(component.displayAlert()).toBeTruthy();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));
});
