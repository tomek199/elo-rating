import {LeagueAssignComponentStub} from './../../testing/league-stubs';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {PlayerRankingStubComponent, PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../../players/shared/player.service';
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {LeagueDetailComponent} from './league-detail.component';
import {LeagueService} from '../shared/league.service';
import {LeagueServiceStub} from '../../testing/league-stubs';
import {ActivatedRouteStub} from '../../testing/routing-stubs';

describe('LeagueDetailComponent', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ 
        LeagueDetailComponent,
        PlayerRankingStubComponent,
        SpinnerComponent,
        LeagueAssignComponentStub
      ], 
      imports: [ RouterTestingModule ],
      providers: [
        {provide: LeagueService, useClass: LeagueServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: PlayerService, useClass: PlayerServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent(LeagueId: String) {
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: LeagueId}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent('123');
    expect(component).toBeTruthy();
  }));

  it('should has league name field', fakeAsync(() => {
    createComponent('123');
    expect(component.league).toBeTruthy();
    expect(component.league.name).toEqual('League name');
  }));

  it('should has null league variable if league does not exist', fakeAsync(() => {
    createComponent('456');
    expect(component.league).toBeNull();
  }));

  it('should display league name in header', fakeAsync(() => {
    createComponent('123');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('h1 small'));
    expect(debugElement.nativeElement.textContent).toEqual('League name');
  }));

  it('should display alert if league does not exist', fakeAsync(() => {
    createComponent('456');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-warning'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should contains player-ranking component', fakeAsync(() => {
    createComponent('123');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.directive(PlayerRankingStubComponent));
    expect(debugElement).toBeTruthy();
  }));
});
