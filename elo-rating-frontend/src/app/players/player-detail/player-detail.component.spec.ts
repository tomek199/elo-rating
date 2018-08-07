import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  PlayerForecastStubComponent,
  PlayerMatchesStubComponent,
  PlayerOpponentsStubComponent,
  PlayerServiceStub,
  PlayerStatisticsStubComponent,
  PlayerUserInfoStubComponent
} from './../../testing/player-stubs';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {ActivatedRoute} from '@angular/router';
import {PlayerService} from './../shared/player.service';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PlayerDetailComponent} from './player-detail.component';

describe('PlayerDetailComponent', () => {
  let component: PlayerDetailComponent;
  let fixture: ComponentFixture<PlayerDetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ 
        PlayerDetailComponent, 
        PlayerUserInfoStubComponent,
        PlayerMatchesStubComponent, 
        PlayerStatisticsStubComponent,
        PlayerForecastStubComponent,
        PlayerOpponentsStubComponent,
        SpinnerComponent
      ],
      imports: [ RouterTestingModule, FormsModule, NgbModule.forRoot()],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent(playerId: string) {
    fixture = TestBed.createComponent(PlayerDetailComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123', player_id: playerId};
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent('456');
    expect(component).toBeTruthy();
  }));

  it('should display player details', fakeAsync(() => {
    createComponent('123');
    expect(component.player).toBeTruthy();
    expect(component.player.username).toEqual('Player 1')
    expect(component.player.rating).toEqual(1000);
  }));

  it('should has leagueId property', fakeAsync(() => {
    createComponent('456');
    expect(component.leagueId).toEqual('123');
  }));

  it('should display player username in header', fakeAsync(() => {
    createComponent('123');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('h2 small'));
    expect(debugElement.nativeElement.textContent).toBe('Player 1');
  }));
});
