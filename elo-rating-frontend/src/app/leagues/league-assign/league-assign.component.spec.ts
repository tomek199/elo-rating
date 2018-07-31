import {UserServiceStub} from './../../testing/user-stubs';
import {UserService} from './../../users/shared/user.service';
import {By} from '@angular/platform-browser';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {User} from './../../users/shared/user.model';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LeagueAssignComponent} from './league-assign.component';
import {League} from "app/leagues/shared/league.model";

describe('LeagueAssignComponent', () => {
  let component: LeagueAssignComponent;
  let fixture: ComponentFixture<LeagueAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueAssignComponent ],
      providers: [ 
        GoogleAuthService,
        {provide: UserService, useClass: UserServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueAssignComponent);
    component = fixture.componentInstance;
    component.league = new League('987', 'Test league');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display nothing for assigned league', () => {
    component.league.users = [new User(), new User()];
    fixture.detectChanges();
    let debugElement = fixture.debugElement;
    expect(debugElement.nativeElement.textContent.length).toBeLessThan(2);
  });

  it('should display warning for not assigned league and not signed in user', () => {
    component.league.users = [];
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-warning'));
    expect(debugElement).toBeTruthy();
  });

  it('should display card for not assigned league and signed in user', () => {
    component.league.users = [];
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.card.text-center'));
    expect(debugElement).toBeTruthy();
  });

  it('should assign league to user and display success alert', fakeAsync(() => {
    component.league.users = [];
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    let user = new User();
    user.id = '987';
    spyOn(authService, 'getCurrentUser').and.returnValue(user);
    component.assignLeague();
    tick();
    expect(component.showSuccessAlert).toBeTruthy();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-success'));
    expect(debugElement).toBeTruthy();
  }));
});
