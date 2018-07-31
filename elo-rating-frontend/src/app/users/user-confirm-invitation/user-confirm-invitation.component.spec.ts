import {By} from '@angular/platform-browser';
import {UserServiceStub} from './../../testing/user-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {ActivatedRouteStub} from './../../testing/routing-stubs';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './../shared/user.service';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {GoogleAuthServiceStub, GoogleButtonComponentStub, GoogleUserStub} from './../../testing/google-stubs';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserConfirmInvitationComponent} from './user-confirm-invitation.component';

describe('UserConfirmInvitationComponent', () => {
  let component: UserConfirmInvitationComponent;
  let fixture: ComponentFixture<UserConfirmInvitationComponent>;
  let activatedRoute: ActivatedRouteStub;  

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();    
    TestBed.configureTestingModule({
      declarations: [ 
        UserConfirmInvitationComponent, 
        GoogleButtonComponentStub, 
        SpinnerComponent
       ],
      imports: [ RouterTestingModule ], 
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub},
        {provide: UserService, useClass: UserServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfirmInvitationComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {token: 'aa11bb22cc33'};
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should present danger alert for incorrect token', () => {
    component.securityToken = null;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-danger'));
    expect(debugElement).toBeTruthy();
  });

  it('should present jumbotron for not signed in user', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.jumbotron'));
    expect(debugElement).toBeTruthy();    
  }));

  it('should present success alert after confirmed invitation', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.signIn(new GoogleUserStub());
    tick();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-success'));
    expect(debugElement).toBeTruthy();
  }))
});
