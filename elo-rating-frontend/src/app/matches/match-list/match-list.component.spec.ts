import { environment } from './../../../environments/environment';
import { MATCHES } from './../../testing/data/matches';
import { Match } from './../shared/match.model';
import { PlayerCellStubComponent } from './../../testing/player-stubs';
import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { CookieService } from 'ng2-cookies';
import { PageSizeComponent } from './../../core/directives/page-size/page-size.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { MatchServiceStub } from './../../testing/match-stubs';
import { MatchService } from './../shared/match.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed, tick, fakeAsync, discardPeriodicTasks } from '@angular/core/testing';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [
        MatchListComponent,
        PageSizeComponent,
        PlayerCellStubComponent,
        SpinnerComponent
      ],
      imports: [RouterTestingModule, FormsModule, NgbModule.forRoot()],
      providers: [
        { provide: MatchService, useClass: MatchServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GoogleAuthService, useClass: GoogleAuthServiceStub },
        CookieService
      ]
    })
      .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = { league_id: '123' }
    fixture.detectChanges();
    tick();
    discardPeriodicTasks();
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
    expect(component.page.content.length).toBeGreaterThan(0);
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
    component.page.content = [];
    component.page.numberOfElements = 0;
    component.scheduledMatches = [];
    fixture.detectChanges();
    expect(component.displayAlert()).toBeTruthy();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should present winner on green background in played matches table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr'));
    expect(debugElement[0].query(By.css('td.table-success')).nativeElement.textContent).toContain('Player 1');
    expect(debugElement[1].query(By.css('td.table-success')).nativeElement.textContent).toContain('Player 2');
  }));

  it('should display delete button for matches where both players are deleted', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr td.text-right button.btn-outline-danger'));
    expect(debugElement.length).toEqual(1);
  }));

  it('should display revert button only for first match', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#completedMatches tbody tr td.text-right button.btn-warning'));
    expect(debugElement.length).toEqual(1);
  }));

  it('should delete match where both players are deleted', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let completedMatchesCount = component.page.content.length;
    component.delete('777'); // 777 is id of match with both players deleted
    tick();
    let completedMatchesCountAfterDelete = component.page.content.length;
    expect(completedMatchesCountAfterDelete).toEqual(completedMatchesCount - 1);
  }));

  it('should display scheduled matches in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table#scheduledMatches tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should present scheduled match time on red background when time is up', fakeAsync(() => {
    createComponent();
    let pastDate = new Date();
    pastDate.setMinutes(pastDate.getMinutes() - 15);
    component.scheduledMatches[0].date = pastDate;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('table#scheduledMatches tbody tr td.table-danger'));
    expect(debugElement).toBeTruthy();
  }))

  it('should not show reschedule button if matches are not after time', fakeAsync(() => {
    createComponent();
    let rescheduleBtn = fixture.debugElement.query(By.css('table#scheduledMatches tbody tr td button#rescheduleBtn'));
    expect(rescheduleBtn).toBeNull();
  }));

  it('should show reschedule button if one of matches is after time', fakeAsync(() => {
    createComponent();
    let pastDate = new Date();
    pastDate.setMinutes(pastDate.getMinutes() - 15);
    component.scheduledMatches[0].date = pastDate;
    fixture.detectChanges();
    let rescheduleBtn = fixture.debugElement.query(By.css('table#scheduledMatches tbody tr td button#rescheduleBtn'));
    expect(rescheduleBtn).toBeTruthy();
  }));

  it('should return true for gap between matches', fakeAsync(() => {
    createComponent();
    let match = component.scheduledMatches[0];
    let matchAfter = component.scheduledMatches[1];

    match.date = new Date();
    matchAfter.date = new Date();
    matchAfter.date.setMinutes(matchAfter.date.getMinutes() + 21);

    let gapBetweenMatches = component.isGapBeetweenMatches(matchAfter, match);
    expect(gapBetweenMatches).toBeTruthy();
  }));

  it('should reschedule matches', fakeAsync(() => {
    createComponent();
    let pastDate = new Date();
    pastDate.setMinutes(pastDate.getMinutes() - 20);
    component.scheduledMatches[0].date = pastDate;
    fixture.detectChanges();

    pastDate.setMinutes(pastDate.getMinutes() - 20);
    component.scheduledMatches[0].date = pastDate;
    fixture.detectChanges();

    let matches = component.scheduledMatches;
    let firstMatchMinutes = component.scheduledMatches[0].date.getMinutes();
    let secondMatchMinutes = component.scheduledMatches[1].date.getMinutes();
    let rescheduleBtn = fixture.debugElement.query(By.css('table#scheduledMatches tbody tr td button#rescheduleBtn'));
    expect(rescheduleBtn).toBeTruthy();

    rescheduleBtn.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    let rescheduledMatches = component.scheduledMatches;
    expect(rescheduledMatches[0].date.getMinutes()).toEqual(firstMatchMinutes + environment.matchDuration);
    expect(rescheduledMatches[1].date.getMinutes()).toEqual(secondMatchMinutes);
  }));
});
