import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerUserInfoComponent } from './player-user-info.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
