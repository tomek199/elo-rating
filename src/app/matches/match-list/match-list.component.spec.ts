import { By } from '@angular/platform-browser';
import { MatchServiceStub } from './../../testing/match-stubs';
import { MatchService } from './../shared/match.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ MatchListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: MatchService, useClass: MatchServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
    fixture.detectChanges();
    tick();
  };

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have league id', fakeAsync(() => {
    createComponent();
    expect(component.leagueId).toEqual('123');
  }));

  it('should have matches list', fakeAsync(() => {
    createComponent();
    expect(component.matches.length).toBeGreaterThan(0);
    expect(component.hasMatches()).toBeTruthy();
  }));

  it('should display matches in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should display alert if matches list is empty', fakeAsync(() => {
    createComponent();
    component.matches = [];
    fixture.detectChanges();
    expect(component.hasMatches()).toBeFalsy();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));
});
