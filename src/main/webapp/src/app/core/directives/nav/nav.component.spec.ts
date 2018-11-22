import { CollapseModule } from 'ngx-bootstrap';
import {GoogleAuthService} from './../../../auth/shared/google-auth.service';
import {GoogleAuthComponentStub, GoogleAuthServiceStub} from './../../../testing/google-stubs';
import {RouterLinkStub} from './../../../testing/routing-stubs';
import {FormsModule} from '@angular/forms';
import {LeagueSearchComponentStub} from './../../../testing/league-stubs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {NavComponent} from './nav.component';
import {QueueListComponentStub} from './../../../testing/queue-stubs';
import {debug} from 'util';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent,
        QueueListComponentStub,
        LeagueSearchComponentStub,
        RouterLinkStub,
        GoogleAuthComponentStub
      ],
      imports: [
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        CollapseModule
      ],
      providers: [
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    component.leagueId = '123';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title ', () => {
    expect(component.title).toEqual('EloRating');
  });

  it('should render title in navbar header', () => {
    let debugElement = fixture.debugElement.query(By.css('nav div.container a.navbar-brand'));
    expect(debugElement.nativeElement.textContent).toContain('EloRating');
  });

  it('should render navbar for user which selected league', fakeAsync(() => {
    component.ngOnChanges();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('nav ul.navbar-nav li a'));
    expect(debugElement[0].nativeElement.textContent).toEqual('Dashboard');
    expect(debugElement[1].nativeElement.textContent).toEqual('Matches');
    expect(debugElement[2].nativeElement.textContent).toEqual('Players');
  }));

  it('should have app-queue-list component', fakeAsync(() => {
    let debugElement = fixture.debugElement.query(By.directive(QueueListComponentStub));
    expect(debugElement).toBeTruthy();
  }));

  it('should have "Add match" button', fakeAsync(() => {
    let debugElement = fixture.debugElement.query(By.css('nav form#addMatch a'));
    expect(debugElement).toBeTruthy();
    expect(debugElement.nativeElement.textContent).toContain('Add match');
  }));

  it('should have app-league-search component league', () => {
    component.leagueId = undefined;
    component.ngOnChanges();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.directive(LeagueSearchComponentStub));
    expect(debugElement).toBeTruthy();
  });

  it('should have league settings button', () => {
    let debugElement = fixture.debugElement.query(By.css('nav ul li#leagueSettingsBtn'));
    expect(debugElement).toBeTruthy();
  });

  it('should have app-google-auth component', fakeAsync(() => {
    let debugElement = fixture.debugElement.query(By.directive(GoogleAuthComponentStub));
    expect(debugElement).toBeTruthy();
  }));
});
