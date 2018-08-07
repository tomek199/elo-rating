import {UserServiceStub} from './../../testing/user-stubs';
import {UserService} from 'app/users/shared/user.service';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserProfileEmailsNotificationsComponent} from './user-profile-emails-notifications.component';
import {USERS} from 'app/testing/data/users';
import {UiSwitcherStub} from 'app/testing/switcher-stubs';

describe('UserProfileEmailsNotificationsComponent', () => {
  let component: UserProfileEmailsNotificationsComponent;
  let fixture: ComponentFixture<UserProfileEmailsNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfileEmailsNotificationsComponent,
        UiSwitcherStub
       ],
       providers: [
         { provide: UserService, useClass: UserServiceStub }
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

  it('should change when Scheduled match notification clicked', fakeAsync(() => {
    let originalScheduledMatchNotification = component.user.emailsNotifications.scheduledMatchNotification;
    expect(originalScheduledMatchNotification).toBeFalsy();

    let scheduledMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[0].nativeElement;
    expect(scheduledMatchNotificationSwitcher).toBeTruthy();

    scheduledMatchNotificationSwitcher.dispatchEvent(new Event('ngModelChange'));
    tick();
    let newScheduledMatchNotification = component.user.emailsNotifications.scheduledMatchNotification;
    expect(newScheduledMatchNotification).toBeTruthy();
  }))

  it('should change when Edited match notification clicked', fakeAsync(() => {
    let originalEditedMatchNotification = component.user.emailsNotifications.editedMatchNotification;
    expect(originalEditedMatchNotification).toBeFalsy();

    let editedMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[1].nativeElement;
    expect(editedMatchNotificationSwitcher).toBeTruthy();

    editedMatchNotificationSwitcher.dispatchEvent(new Event('ngModelChange'));
    tick();
    let newEditedMatchNotification = component.user.emailsNotifications.editedMatchNotification;
    expect(newEditedMatchNotification).toBeTruthy();

  }))

  it('should change when Cancelled match notification clicked', fakeAsync(() => {
    let originalCancelledMatchNotification = component.user.emailsNotifications.cancelledMatchNotification;
    expect(originalCancelledMatchNotification).toBeFalsy();

    let cancelledMatchNotificationSwitcher = fixture.debugElement.queryAll(By.css('ul li span ui-switch'))[2].nativeElement;
    expect(cancelledMatchNotificationSwitcher).toBeTruthy();

    cancelledMatchNotificationSwitcher.dispatchEvent(new Event('ngModelChange'));
    tick();
    let newCancelledMatchNotification = component.user.emailsNotifications.cancelledMatchNotification;
    expect(newCancelledMatchNotification).toBeTruthy();

  }))
});
