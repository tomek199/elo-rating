import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {USERS} from './../../testing/data/users';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileLeaguesComponent} from './user-profile-leagues.component';

describe('UserProfileLeaguesComponent', () => {
  let component: UserProfileLeaguesComponent;
  let fixture: ComponentFixture<UserProfileLeaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLeaguesComponent ], 
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLeaguesComponent);
    component = fixture.componentInstance;
    component.user = USERS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user', () => {
    expect(component.user).toBeTruthy();
  })

  it('should display alert if user doesn\'t have any leagues', () => {
    component.user = USERS[1];
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(alert).toBeTruthy();
  });

  it('should display leagues in table', () => {
    fixture.detectChanges();
    let leagues = fixture.debugElement.queryAll(By.css('table tr'));
    expect(leagues.length).toEqual(USERS[0].leagues.length);
  });
});
