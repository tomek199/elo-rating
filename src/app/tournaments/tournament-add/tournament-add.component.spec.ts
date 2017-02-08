/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/routing-stubs';

import { TournamentAddComponent } from './tournament-add.component';
import { TournamentService } from '../shared/tournament.service';
import { TournamentServiceStub } from '../../testing/tournament-stubs';

describe('TournamentAddComponent', () => {
  let component: TournamentAddComponent;
  let fixture: ComponentFixture<TournamentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentAddComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: TournamentService, useClass: TournamentServiceStub},
        {provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(TournamentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should create and move to tournament details after click submit button', inject([Router], fakeAsync((router: Router) => {
    createComponent();
    const spy = spyOn(router, 'navigate');
    component.tournament.name = 'New tournament';
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/tournament');
    expect(spy.calls.first().args[0][1]).toBeTruthy();
  })));
});
