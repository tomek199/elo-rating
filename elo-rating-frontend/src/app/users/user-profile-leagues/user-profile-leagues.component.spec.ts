import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLeaguesComponent } from './user-profile-leagues.component';

describe('UserProfileLeaguesComponent', () => {
  let component: UserProfileLeaguesComponent;
  let fixture: ComponentFixture<UserProfileLeaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLeaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
