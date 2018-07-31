/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterStub} from '../../testing/routing-stubs';

import {LeagueAddComponent} from './league-add.component';
import {LeagueService} from '../shared/league.service';
import {LeagueServiceStub} from '../../testing/league-stubs';

describe('LeagueAddComponent', () => {
  let component: LeagueAddComponent;
  let fixture: ComponentFixture<LeagueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueAddComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: LeagueService, useClass: LeagueServiceStub},
        {provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(LeagueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should create and move to league details after click submit button', inject([Router], fakeAsync((router: Router) => {
    createComponent();
    const spy = spyOn(router, 'navigate');
    component.league.name = 'New league';
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('form button[type=submit]'));
    debugElement.triggerEventHandler('click', null);
    tick();
    expect(spy.calls.first().args[0][0]).toEqual('/leagues');
    expect(spy.calls.first().args[0][1]).toBeTruthy();
  })));
});
