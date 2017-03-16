import { Player } from './../../players/shared/player.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NgbTypeahead, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { ActivatedRouteStub, RouterStub } from './../../testing/routing-stubs';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MatchAddComponent } from './match-add.component';

describe('MatchAddComponent', () => {
  let component: MatchAddComponent;
  let fixture: ComponentFixture<MatchAddComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ MatchAddComponent ], 
      imports: [ FormsModule, RouterTestingModule, NgbModule.forRoot() ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: NgbTypeahead}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(MatchAddComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: '123'}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have tournament id', fakeAsync(() => {
    createComponent();
    expect(component.tournamentId).toEqual('123');
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

  it ('should validate Match model', fakeAsync(() => {
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
});
