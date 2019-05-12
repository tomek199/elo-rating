import {LeagueService} from './leagues/shared/league.service';
import {GoogleAuthServiceStub} from './testing/google-stubs';
import {GoogleAuthService} from './auth/shared/google-auth.service';
import {CookieService} from 'ng2-cookies';
import {NavComponentStub} from './testing/nav-stubs';
import {ActivatedRouteStub, RouterLinkStub, RouterOutletStub, RouterStub} from './testing/routing-stubs';
import {LeagueServiceStub} from './testing/league-stubs';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {FooterComponentStub} from "./testing/footer-stubs";

describe('AppComponent', () => {
  let routerStub: RouterStub;
  let activatedRoute: ActivatedRouteStub;
  const LEAGUE_ID = '5a5a26f148a203c09141efe1';
  
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponentStub,
        FooterComponentStub,
        RouterOutletStub,
        RouterLinkStub
      ],
      imports: [
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: LeagueService, useClass: LeagueServiceStub },
        { provide: GoogleAuthService, useClass: GoogleAuthServiceStub },
        CookieService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain NavComponent', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    activatedRoute.testParams = {league_id: LEAGUE_ID};
    fixture.detectChanges();    
    tick();
    let debugElement = fixture.debugElement.query(By.directive(NavComponentStub))
    expect(debugElement).toBeTruthy();
  }));

  it('should have main-container div tag', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.css('div#main-container.container'));
    expect(debugElement).toBeTruthy();
  });

  it('should have router-outlet component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(RouterOutletStub))
    expect(debugElement).toBeTruthy();
  });

  it('should have league Id after changing url', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    activatedRoute.testParams = {league_id: LEAGUE_ID};
    fixture.detectChanges();    
    tick();
    expect(fixture.componentInstance.leagueId).toEqual(LEAGUE_ID);
  }));

  it('should contain FooterComponent', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let footer = fixture.debugElement.query(By.directive(FooterComponentStub));
    expect(footer).toBeTruthy();
  }));
});
