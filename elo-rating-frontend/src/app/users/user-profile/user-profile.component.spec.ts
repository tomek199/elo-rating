import {By} from '@angular/platform-browser';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {User} from './../shared/user.model';
import {USERS} from './../../testing/data/users';
import {
  UserProfileEmailsNotificationsStubComponent,
  UserProfileInfoStubComponent,
  UserProfileLeaguesStubComponent,
  UserServiceStub
} from './../../testing/user-stubs';
import {UserService} from './../shared/user.service';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserProfileComponent} from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let stubUser: User;

  beforeEach(async(() => {
    stubUser = USERS[0];
    TestBed.configureTestingModule({
      declarations: [ 
        UserProfileComponent, 
        SpinnerComponent, 
        UserProfileInfoStubComponent, 
        UserProfileLeaguesStubComponent,
        UserProfileEmailsNotificationsStubComponent
      ],
      providers: [
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub},
        {provide: UserService, useClass: UserServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.user.email).toEqual(stubUser.email);
    expect(component.user.name).toEqual(stubUser.name);
  }));

  it('should have \'info\' as default component', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.component).toEqual('info');
    let infoComponent = fixture.debugElement.query(By.directive(UserProfileInfoStubComponent));
    let leaguesComponent = fixture.debugElement.query(By.directive(UserProfileLeaguesStubComponent));
    expect(infoComponent).toBeTruthy();
    expect(leaguesComponent).toBeFalsy();
  }));

  it('should display \'leagues\' component after click', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let menu = fixture.debugElement.queryAll(By.css('div.list-group button'));
    menu[2].triggerEventHandler('click', null);
    fixture.detectChanges();
    let infoComponent = fixture.debugElement.query(By.directive(UserProfileInfoStubComponent));
    let leaguesComponent = fixture.debugElement.query(By.directive(UserProfileLeaguesStubComponent));
    expect(infoComponent).toBeFalsy();
    expect(leaguesComponent).toBeTruthy();
  }))
});
