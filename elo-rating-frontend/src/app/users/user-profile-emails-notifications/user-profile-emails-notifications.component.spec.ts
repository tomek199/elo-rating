import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEmailsNotificationsComponent } from './user-profile-emails-notifications.component';

describe('UserProfileEmailsNotificationsComponent', () => {
  let component: UserProfileEmailsNotificationsComponent;
  let fixture: ComponentFixture<UserProfileEmailsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileEmailsNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEmailsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
