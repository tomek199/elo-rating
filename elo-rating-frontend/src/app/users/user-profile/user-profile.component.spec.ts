import { User } from './../shared/user.model';
import { USERS } from './../../testing/data/users';
import { UserServiceStub } from './../../testing/user-stubs';
import { UserService } from './../shared/user.service';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let stubUser: User;

  beforeEach(async(() => {
    stubUser = USERS[0];
    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
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
    component.ngOnInit()
    tick()
    expect(component.user.email).toEqual(stubUser.email);
    expect(component.user.name).toEqual(stubUser.name);
  }));
});
