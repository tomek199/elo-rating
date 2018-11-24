import {LeagueServiceStub} from './../../testing/league-stubs';
import {LeagueService} from './../../leagues/shared/league.service';
import {LEAGUES} from './../../testing/data/leagues';
import {BtnSpinnerDirective} from './../../core/directives/btn-spinner/btn-spinner.directive';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {MatchServiceStub} from './../../testing/match-stubs';
import {MatchService} from './../shared/match.service';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {NgbModule, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../../players/shared/player.service';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {MatchSaveComponent} from './match-save.component';
import {PLAYERS} from "../../testing/data/players";

describe('MatchSaveComponent', () => {
  let component: MatchSaveComponent;
  let fixture: ComponentFixture<MatchSaveComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [
        MatchSaveComponent, 
        SpinnerComponent, 
        BtnSpinnerDirective
      ],
      imports: [
        FormsModule, 
        NgbModule.forRoot(), 
        RouterTestingModule
      ],
      providers: [
        { provide: LeagueService, useClass: LeagueServiceStub },
        { provide: PlayerService, useClass: PlayerServiceStub },
        { provide: MatchService, useClass: MatchServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GoogleAuthService, useClass: GoogleAuthServiceStub},
        { provide: NgbTypeahead }
      ]
    })
      .compileComponents();
  }));

  function createComponent(matchId?: string, mode?: string) {
    fixture = TestBed.createComponent(MatchSaveComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = { league_id: '123' };
    if (matchId != null && mode != null) {
      activatedRoute.testParams = {league_id: '123', match_id: matchId, mode: mode };
    }
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have league id', fakeAsync(() => {
    createComponent();
    expect(component.leagueId).toEqual('123');
  }));

  it('should have league settings saved in properties', fakeAsync(() => {
    createComponent();
    let stubLeague = LEAGUES[0];
    expect(component.scores.length).toEqual(stubLeague.settings.maxScore + 1);
    expect(component.allowDraws).toEqual(stubLeague.settings.allowDraws);
  }));

  it('should have match when match id provided', fakeAsync(() => {
    createComponent('111', 'complete');
    expect(component.match.id).toEqual('111');
  }));

  it('should have mode when match id is provided', fakeAsync(() => {
    createComponent('111', 'edit');
    expect(component.mode).toEqual('edit');
  }));

  it('should have disabled checked "Complete match" checkbox for "complete" mode', fakeAsync(() => {
    createComponent('111', 'complete');
    fixture.detectChanges();
    expect(component.mode).toEqual('complete');
    expect(component.match.completed).toEqual(true);
    let debugElement = fixture.debugElement.query(By.css('form input[type=checkbox]:disabled'));
    expect(debugElement).toBeTruthy();
  }));

  it('should have disabled unchecked "Complete match" checkbox for "edit" mode', fakeAsync(() => {
    createComponent('111', 'edit');
    fixture.detectChanges();
    expect(component.mode).toEqual('edit');
    expect(component.match.completed).toEqual(false);
    let debugElement = fixture.debugElement.query(By.css('form input[type=checkbox]:disabled'));    
    expect(debugElement).toBeTruthy();    
  }));

  it('should have timepicker\'s time initialized by match\'s time', fakeAsync(() => {
    createComponent('111', 'edit');
    fixture.detectChanges();
    expect(component.time.hour).toEqual(component.match.date.getHours());
    expect(component.time.minute).toEqual(component.match.date.getMinutes());    
  }));

  it('should check if has active players', fakeAsync(() => {
    createComponent();
    expect(component.hasMinTwoPlayers()).toBeTruthy();
  }));

  it('should display alert if does not have at least two active players', fakeAsync(() => {
    createComponent();
    component.hasActivePlayers = false;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(component.displayAlert()).toBeTruthy();
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should validate Match model', fakeAsync(() => {
    createComponent();
    expect(component.formValid()).toBeFalsy();
    component.match.playerOne = PLAYERS[0];
    component.match.playerTwo = PLAYERS[0];
    component.match.completed = true;
    component.playerOneScore = 2;
    component.playerTwoScore = 1;
    fixture.detectChanges();
    expect(component.formValid()).toBeFalsy();
    component.match.playerTwo = PLAYERS[1];
    component.setMatchScore();
    fixture.detectChanges();
    expect(component.formValid()).toBeTruthy();
  }));

  it('should create match and go to matches list', inject([Router], fakeAsync((router: Router) => {
    createComponent();
    const spy = spyOn(router, 'navigate');
    component.match.playerOne = PLAYERS[0];
    component.match.playerTwo = PLAYERS[1];
    component.playerOneScore = 2;
    component.playerTwoScore = 1;
    component.setMatchScore();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/leagues');
    expect(spy.calls.first().args[0][1]).toEqual('123');
    expect(spy.calls.first().args[0][2]).toEqual('matches');
  })));
});
