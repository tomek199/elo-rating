import { LeagueServiceStub } from './testing/league-stubs';
import { LeagueService } from './leagues/shared/league.service';
import { FormsModule } from '@angular/forms';
import { LeagueSearchComponent } from './leagues/league-search/league-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { QueueAddComponent } from './queue/queue-add/queue-add.component';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { QueueListComponent } from './queue/queue-list/queue-list.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        QueueListComponent,
        QueueAddComponent,
        LeagueSearchComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: LeagueService, useClass: LeagueServiceStub }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain NavComponent', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(NavComponent))
    expect(debugElement).toBeTruthy();
  });

  it('should have main-container div tag', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.css('div#main-container.container'));
    expect(debugElement).toBeTruthy();
  });

  it('should have router-outlet component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(debugElement).toBeTruthy();
  });
});
