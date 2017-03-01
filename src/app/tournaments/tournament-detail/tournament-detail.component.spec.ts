/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TournamentDetailComponent } from './tournament-detail.component';
import { TournamentService } from '../shared/tournament.service';
import { TournamentServiceStub } from '../../testing/tournament-stubs';
import { ActivatedRouteStub } from '../../testing/routing-stubs';

describe('TournamentDetailComponent', () => {
  let component: TournamentDetailComponent;
  let fixture: ComponentFixture<TournamentDetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ TournamentDetailComponent ], 
      imports: [ RouterTestingModule ],
      providers: [
        {provide: TournamentService, useClass: TournamentServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  function createComponent(TournamentId: String) {
    fixture = TestBed.createComponent(TournamentDetailComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: TournamentId}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent('123');
    expect(component).toBeTruthy();
  }));

  it('should display tournament details', fakeAsync(() => {
    createComponent('123');
    expect(component.tournament).toBeTruthy();
    expect(component.tournament.name).toEqual('Tournament name');
  }));

  it('should has empty tournament variable if tournamet does not exist', fakeAsync(() => {
    createComponent('456');
    expect(component.tournament).toBeFalsy();
  }));

  it('should display tournament ', fakeAsync(() => {
    createComponent('123');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('h1'));
    expect(debugElement.nativeElement.textContent).toEqual('Tournament name');
  }));

  it('should display alert if tournament does not exist', fakeAsync(() => {
    createComponent('456');
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-warning'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));
});
