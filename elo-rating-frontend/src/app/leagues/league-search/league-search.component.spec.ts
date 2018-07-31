import {NgbModule, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {LeagueServiceStub} from './../../testing/league-stubs';
import {LeagueService} from './../shared/league.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LeagueSearchComponent} from './league-search.component';

describe('LeagueSearchComponent', () => {
  let component: LeagueSearchComponent;
  let fixture: ComponentFixture<LeagueSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueSearchComponent ],
      imports: [ FormsModule, NgbModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: LeagueService, useClass:  LeagueServiceStub },
        { provide: NgbTypeahead }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
