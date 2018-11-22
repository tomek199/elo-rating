import {By} from '@angular/platform-browser';
import {LeagueAddComponentStub, LeagueSearchComponentStub} from './../../testing/league-stubs';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LeagueWelcomeComponent} from './league-welcome.component';

describe('LeagueWelcomeComponent', () => {
  let component: LeagueWelcomeComponent;
  let fixture: ComponentFixture<LeagueWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueWelcomeComponent, LeagueSearchComponentStub, LeagueAddComponentStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have league-search component', () => {
    let leagueSearch = fixture.debugElement.query(By.directive(LeagueSearchComponentStub));
    expect(leagueSearch).toBeTruthy();
  });

  it('should have league-add component', () => {
    let leagueAdd = fixture.debugElement.query(By.directive(LeagueAddComponentStub));
    expect(leagueAdd).toBeTruthy();
  });
});
