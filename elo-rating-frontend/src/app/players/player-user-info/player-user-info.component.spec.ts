import { USERS } from './../../testing/data/users';
import { PLAYERS } from './../../testing/data/players';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerUserInfoComponent } from './player-user-info.component';
import { By } from '@angular/platform-browser';


describe('PlayerUserInfoComponent', () => {
  let component: PlayerUserInfoComponent;
  let fixture: ComponentFixture<PlayerUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerUserInfoComponent);
    component = fixture.componentInstance;
    component.player = PLAYERS[4];
    fixture.detectChanges();
  });

  afterEach(() => {
    component.player.user = USERS[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert when user is not defined', () => {
    component.player.user = undefined;
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-secondary'));
    expect(alert).toBeTruthy();
  });

  it('should show card with user info', () => {
    fixture.detectChanges();
    let card = fixture.debugElement.query(By.css('div.card'));
    expect(card).toBeTruthy();
    let image = card.query(By.css('img'));
    expect(image).toBeTruthy();
    let email = card.query(By.css('div.card-body p:first-child'));
    expect(email.nativeElement.textContent).toEqual(USERS[0].email);
    let lastSignedIn = card.query(By.css('div.card-body p small'));
    expect(lastSignedIn.nativeElement.textContent).toBeTruthy();
  });
});
