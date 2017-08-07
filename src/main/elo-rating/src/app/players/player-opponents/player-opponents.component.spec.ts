import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOpponentsComponent } from './player-opponents.component';

describe('PlayerOpponentsComponent', () => {
  let component: PlayerOpponentsComponent;
  let fixture: ComponentFixture<PlayerOpponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerOpponentsComponent, SpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerOpponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
