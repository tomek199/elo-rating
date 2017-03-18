import { MatchServiceStub } from './../../testing/match-stubs';
import { MatchService } from './../shared/match.service';
import { Player } from './../../players/shared/player.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgbTypeahead, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { ActivatedRouteStub, RouterStub } from './../../testing/routing-stubs';
import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { MatchAddComponent } from './match-add.component';

describe('MatchAddComponent', () => {
  let component: MatchAddComponent;
  let fixture: ComponentFixture<MatchAddComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ MatchAddComponent ], 
      imports: [ FormsModule, NgbModule.forRoot(), RouterTestingModule],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},        
        {provide: MatchService, useClass: MatchServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: NgbTypeahead}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(MatchAddComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
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

  it('should have players list', fakeAsync(() => {
    createComponent();
    expect(component.players.length).toBeGreaterThan(0);
  }));

  it('should display alert if players are less than two', fakeAsync(() => {
    createComponent();
    let playersCount = component.players.length;
    component.players = [new Player()];
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(component.hasMinTwoPlayers()).toBeFalsy();
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should validate Match model', fakeAsync(() => {
    createComponent();
    expect(component.formValid()).toBeFalsy();
    component.match.playerOne = component.players[0];
    component.match.playerTwo = component.players[0];
    component.score = '2-1';
    fixture.detectChanges();
    expect(component.formValid()).toBeFalsy();
    component.match.playerTwo = component.players[1];
    component.setMatchScore();
    fixture.detectChanges();
    expect(component.formValid()).toBeTruthy();
  }));

  it('should create match and go to matches list', inject([Router], fakeAsync((router: Router) => {
    createComponent();
    const spy = spyOn(router, 'navigate');
    component.match.playerOne = component.players[0];
    component.match.playerTwo = component.players[1];
    component.match.playerOneScore = 2;
    component.match.playerTwoScore = 2;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/leagues');
    expect(spy.calls.first().args[0][1]).toEqual('123');
    expect(spy.calls.first().args[0][2]).toEqual('matches');
  })));
});
