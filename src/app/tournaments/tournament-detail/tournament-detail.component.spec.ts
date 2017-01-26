/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      providers: [
        {provide: TournamentService, useClass: TournamentServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDetailComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: '123'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tournament details', () => {
    expect(component.tournament).toBeTruthy();
  });

  it('should has empty tournament variable if tournamet does not exist', () => {
    activatedRoute.testParams = {tournament_id: '456'}
    expect(component.tournament).toBeFalsy();
  });
});
