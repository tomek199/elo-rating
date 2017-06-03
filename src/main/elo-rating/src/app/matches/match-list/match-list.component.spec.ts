import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
      imports: [ RouterTestingModule, NgbModule.forRoot() ],
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

  it('should have played matches list', fakeAsync(() => {
    createComponent();
    expect(component.completedMatches.length).toBeGreaterThan(0);
    expect(component.hasCompletedMatches()).toBeTruthy();
  }));

  it('should have scheduled matches list', fakeAsync(() => {
    createComponent();
    expect(component.scheduledMatches.length).toBeGreaterThan(0);
    expect(component.hasScheduledMatches()).toBeTruthy();
  }));

  it('should display completed matches in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should display alert if matches list is empty', fakeAsync(() => {
    createComponent();
    component.completedMatches = [];
    component.scheduledMatches = [];
    fixture.detectChanges();
    expect(component.hasMatches()).toBeFalsy();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should present winner on green background in played matches table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr'));
    expect(debugElement[0].query(By.css('td.table-success a')).nativeElement.textContent).toEqual('Player 1');
    expect(debugElement[1].query(By.css('td.table-success a')).nativeElement.textContent).toEqual('Player 2');    
  }));

  it('should present disabled player in "<del>" tag and deleted in <em> tag in played matches table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr'));
    expect(debugElement[2].query(By.css('td a del')).nativeElement.textContent).toEqual('Player 3');
    expect(debugElement[2].query(By.css('td em')).nativeElement.textContent).toEqual('deleted player');    
  }));

  it('should display delete button for matches where both players are deleted', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr td.text-right button'));
    expect(debugElement.length).toEqual(1);
  }));

  it('should delete match where both players are deleted', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let completedMatchesCount = component.completedMatches.length;
    component.delete('777'); // 777 is id of match with both players deleted
    tick();
    let completedMatchesCountAfterDelete = component.completedMatches.length;
    expect(completedMatchesCountAfterDelete).toEqual(completedMatchesCount - 1);
  }));

  it('should display scheduled matches in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#scheduledMatches tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));
});
