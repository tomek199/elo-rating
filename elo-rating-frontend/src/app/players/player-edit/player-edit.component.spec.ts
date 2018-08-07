import {By} from '@angular/platform-browser';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../shared/player.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRouteStub, RouterStub} from './../../testing/routing-stubs';
import {ActivatedRoute, Router} from '@angular/router';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {PlayerEditComponent} from './player-edit.component';
import {Player} from '../shared/player.model';

describe('PlayerEditComponent', () => {
  let component: PlayerEditComponent;
  let fixture: ComponentFixture<PlayerEditComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ PlayerEditComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerEditComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123', player_id: '456'}
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

  it('should have player details', fakeAsync(() => {
    createComponent();
    expect(component.player.username).toEqual('Player 2');
    expect(component.player.rating).toEqual(500);
  }));

  it('should update player details',fakeAsync(() => {
    createComponent();
    let player = new Player();
    player.id = '999';
    player.active = true;
    player.username = 'Player to edit';
    component.player = player;
    component.player.username = 'Player updated';
    component.player.active = false;
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(component.player.username).toEqual('Player updated');
    expect(component.player.active).toEqual(false);
    component.player.active = true;
  }));

  it('should redirect to players list', inject([Router], fakeAsync((router: Router) => {
    createComponent();
    const spy = spyOn(router, 'navigate');
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/leagues');
    expect(spy.calls.first().args[0][1]).toEqual('123');    
    expect(spy.calls.first().args[0][2]).toEqual('players');
  })));
});
