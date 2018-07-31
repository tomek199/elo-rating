import {PlayerCellStubComponent} from './../../testing/player-stubs';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {CookieService} from 'ng2-cookies';
import {PageSizeComponent} from './../../core/directives/page-size/page-size.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';
import {MatchServiceStub} from './../../testing/match-stubs';
import {MatchService} from './../shared/match.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {ActivatedRoute} from '@angular/router';
import {async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MatchListComponent} from './match-list.component';
import {BtnSpinnerDirective} from 'app/core/directives/btn-spinner/btn-spinner.directive';

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
        SpinnerComponent,
        BtnSpinnerDirective
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
    expect(debugElement.length).toBeGreaterThan(0);
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
    let rescheduleBtn = fixture.debugElement.query(By.css('h2 button#rescheduleBtn'));
    expect(rescheduleBtn).toBeTruthy();
  }));
});
