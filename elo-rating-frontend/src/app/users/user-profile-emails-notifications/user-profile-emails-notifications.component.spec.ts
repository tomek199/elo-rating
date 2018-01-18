import { By } from '@angular/platform-browser';
import { UiSwitchModule } from 'angular2-ui-switch';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { UserProfileEmailsNotificationsComponent } from './user-profile-emails-notifications.component';
import { USERS } from 'app/testing/data/users';
import { UiSwitcherStub } from 'app/testing/switcher-stubs';

fdescribe('UserProfileEmailsNotificationsComponent', () => {
  let component: UserProfileEmailsNotificationsComponent;
  let fixture: ComponentFixture<UserProfileEmailsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfileEmailsNotificationsComponent,
        UiSwitcherStub
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEmailsNotificationsComponent);
    component = fixture.componentInstance;
    component.user = USERS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change when clicked', fakeAsync(() => {
    let originalScheduledMatchNotification = component.user.emailsNotifications.scheduledMatchNotification;
    let originalEditedMatchNotification = component.user.emailsNotifications.editedMatchNotification;
    let originalCancelledMatchNotification = component.user.emailsNotifications.cancelledMatchNotification;
    expect(originalScheduledMatchNotification).toBeFalsy();
    expect(originalEditedMatchNotification).toBeFalsy();
    expect(originalCancelledMatchNotification).toBeFalsy();

    let scheduledMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[0];
    let editedMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[1];
    let cancelledMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[2];
    expect(scheduledMatchNotificationSwitcher).toBeTruthy();
    expect(editedMatchNotificationSwitcher).toBeTruthy();
    expect(cancelledMatchNotificationSwitcher).toBeTruthy();

  }))
});
