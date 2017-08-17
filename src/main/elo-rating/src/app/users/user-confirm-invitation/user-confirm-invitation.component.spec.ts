import { UserServiceStub } from './../../testing/user-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from './../shared/user.service';
import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { GoogleButtonComponentStub, GoogleAuthServiceStub } from './../../testing/google-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfirmInvitationComponent } from './user-confirm-invitation.component';

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
});
