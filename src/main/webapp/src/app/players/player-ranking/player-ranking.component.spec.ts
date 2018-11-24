import {League} from './../../leagues/shared/league.model';
import {LEAGUES} from './../../testing/data/leagues';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {By} from '@angular/platform-browser';
import {PlayerService} from './../shared/player.service';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PlayerRankingComponent} from './player-ranking.component';
import {LeagueSettings} from '../../leagues/shared/league-settings';

describe('PlayerRankingComponent', () => {
  let component: PlayerRankingComponent;
  let fixture: ComponentFixture<PlayerRankingComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [PlayerRankingComponent, SpinnerComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PlayerService, useClass: PlayerServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerRankingComponent);
    component = fixture.componentInstance;
    component.league = LEAGUES[0];
    component.ngOnChanges();
    fixture.detectChanges();
    tick();
  };

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have league', fakeAsync(() => {
    createComponent();
    expect(component.league.id).toEqual('123');
    expect(component.league.settings).toBeTruthy();
  }));

  it('should display alert if players list is empty', fakeAsync(() => {
    createComponent();
    component.rankedPlayers = [];
    component.players = [];
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(alert.nativeElement).toBeTruthy();
    expect(alert.nativeElement.textContent).toContain('Active players not found!');
  }));

  it('should display alert if ranked players list is empty', fakeAsync(() => {
    createComponent();
    component.rankedPlayers = [];
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(alert.nativeElement).toBeTruthy();
    expect(alert.nativeElement.textContent).toContain('No one played the match!');
  }));

  it('should have players list', fakeAsync(() => {
    createComponent();
    expect(component.rankedPlayers.length).toBeGreaterThan(0);
  }));

  it('should have players sorted by rating', fakeAsync(() => {
    createComponent();
    let currentRating = component.rankedPlayers[0].rating;
    for (let player of component.rankedPlayers) {
      expect(player.rating).toBeLessThanOrEqual(currentRating);
      currentRating = player.rating;
    }
  }));

  it('should display players in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(debugElement.length).toEqual(component.rankedPlayers.length);
  }));

  it('should have players sorted by rating with player stats', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let wonElement = fixture.debugElement.queryAll(By.css('table tbody tr td span.won'))[0];
    let lostElement = fixture.debugElement.queryAll(By.css('table tbody tr td span.lost'))[0];
    let drawElement = fixture.debugElement.queryAll(By.css('table tbody tr td span.draw'))[0];
    expect(wonElement.nativeElement.innerText).toBeTruthy();
    expect(lostElement.nativeElement.innerText).toBeTruthy();
    expect(drawElement).toBeFalsy();
  }));

  it('should have draw column in ranking table when \'allowDraws\' parameter is true', fakeAsync(() => {
    createComponent();
    let league = new League('123', 'League with draws');
    league.settings = new LeagueSettings();
    league.settings.allowDraws = true;
    component.league = league;
    fixture.detectChanges();
    let drawElement = fixture.debugElement.queryAll(By.css('table tbody tr td span.draw'))[0];
    expect(drawElement.nativeElement.innerText).toBeTruthy();    
  }));

  it('should have players that played at least one match', fakeAsync(() => {
    createComponent()
    fixture.detectChanges();
    component.rankedPlayers.forEach((player) => {
      let playedMatches = player.statistics.won + player.statistics.lost;
      expect(playedMatches).toBeGreaterThan(0);
    });
  }));
});
