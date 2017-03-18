import { FormsModule } from '@angular/forms';
import { LeagueSearchComponent } from './../../leagues/league-search/league-search.component';
import { LeagueServiceStub } from './../../testing/league-stubs';
import { LeagueService } from './../../leagues/shared/league.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/routing-stubs';
import { HttpModule } from '@angular/http';

import { NavComponent } from './nav.component';
import { DailyQueueListComponent } from './../../queue/daily-queue-list/daily-queue-list.component';
import { DailyQueueAddComponent } from './../../queue/daily-queue-add/daily-queue-add.component';
import { QueueService } from './../../queue/shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let routerStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavComponent,
        DailyQueueListComponent,
        DailyQueueAddComponent,
        LeagueSearchComponent
      ], 
      imports: [
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: QueueService, useClass: QueueServiceStub },
        { provide: LeagueService, useClass: LeagueServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have title ', () => {
    expect(component.title).toEqual('EloRating');
  });

  it ('should render title in navbar header', () => {
    let debugElement = fixture.debugElement.query(By.css('nav div.container a.navbar-brand'));
    expect(debugElement.nativeElement.textContent).toEqual('EloRating');
  });

  it ('should render navbar for user which selected league', () => {
    let debugElement = fixture.debugElement.queryAll(By.css('nav ul.navbar-nav li a'));
    expect(debugElement[0].nativeElement.textContent).toEqual('Dashboard');
    expect(debugElement[1].nativeElement.textContent).toEqual('Matches');    
    expect(debugElement[2].nativeElement.textContent).toEqual('Players');
    expect(debugElement[3].nativeElement.textContent).toEqual('Queue');
  });

  it('should have app-daily-queue-list component', () => {
    let fixture = TestBed.createComponent(NavComponent);
    let debugElement = fixture.debugElement.query(By.directive(DailyQueueListComponent))
    expect(debugElement).toBeTruthy();
  })
  
  it('should have app-daily-queue-add component', () => {
    let fixture = TestBed.createComponent(NavComponent);
    let debugElement = fixture.debugElement.query(By.directive(DailyQueueAddComponent))
    expect(debugElement).toBeTruthy();
  })

  it('should have app-league-search component', () => {
    let fixture = TestBed.createComponent(NavComponent);
    let debugElement = fixture.debugElement.query(By.directive(LeagueSearchComponent))
    expect(debugElement).toBeTruthy();
  })
});
