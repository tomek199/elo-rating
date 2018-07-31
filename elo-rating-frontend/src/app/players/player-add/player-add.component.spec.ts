import {ActivatedRouteStub, RouterStub} from './../../testing/routing-stubs';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../shared/player.service';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {PlayerAddComponent} from './player-add.component';

describe('PlayerAddComponent', () => {
  let component: PlayerAddComponent;
  let fixture: ComponentFixture<PlayerAddComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ PlayerAddComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAddComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have league id', () => {
    expect(component.leagueId).toEqual('123');
  });

  it('should create and move to players list', inject([Router], fakeAsync((router: Router) => {
    const spy = spyOn(router, 'navigate');
    component.player.username = "NewPlayer";
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/leagues');
    expect(spy.calls.first().args[0][1]).toBeTruthy();
    expect(spy.calls.first().args[0][2]).toEqual('players');    
  })));
});
