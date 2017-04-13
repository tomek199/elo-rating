import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { FormsModule } from '@angular/forms';
import { LeagueSearchComponent } from './../../leagues/league-search/league-search.component';
import { LeagueServiceStub } from './../../testing/league-stubs';
import { LeagueService } from './../../leagues/shared/league.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub, ActivatedRouteStub } from '../../testing/routing-stubs';
import { HttpModule } from '@angular/http';

import { NavComponent } from './nav.component';
import { QueueListComponent } from './../../testing/queue-stubs';
import { QueueService } from './../../queue/shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let routerStub;
  let activatedRoute: ActivatedRouteStub;
  
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ 
        NavComponent,
        QueueListComponent,
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
        { provide: LeagueService, useClass: LeagueServiceStub },
        { provide: PlayerService, useClass: PlayerServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent(leagueId? : string) {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    if (leagueId != null) {
      activatedRoute.testParams = { league_id: leagueId }
      fixture.detectChanges();
      tick();
    }
  }

  it ('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it ('should have title ', () => {
    createComponent();
    expect(component.title).toEqual('EloRating');
  });

  it ('should render title in navbar header', () => {
    createComponent();
    let debugElement = fixture.debugElement.query(By.css('nav div.container a.navbar-brand'));
    expect(debugElement.nativeElement.textContent).toEqual('EloRating');
  });

  it ('should render navbar for user which selected league', fakeAsync(() => {
    createComponent('123');
    let debugElement = fixture.debugElement.queryAll(By.css('nav ul.navbar-nav li a'));
    expect(debugElement[0].nativeElement.textContent).toEqual('Dashboard');
    expect(debugElement[1].nativeElement.textContent).toEqual('Matches');    
    expect(debugElement[2].nativeElement.textContent).toEqual('Players');
    expect(debugElement[3].nativeElement.textContent).toEqual('Queue');
  }));

  it('should have app-queue-list component', fakeAsync(() => {
     createComponent('123');
     let debugElement = fixture.debugElement.query(By.directive(QueueListComponent))
     expect(debugElement).toBeTruthy();
  }));

  it('should have app-league-search component', () => {
    createComponent();
    let debugElement = fixture.debugElement.query(By.directive(LeagueSearchComponent))
    expect(debugElement).toBeTruthy();
  })
});
