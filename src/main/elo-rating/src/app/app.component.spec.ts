import { GoogleAuthServiceStub } from './testing/google-stubs';
import { GoogleAuthService } from './auth/shared/google-auth.service';
import { CookieService } from 'ng2-cookies';
import { NavComponentStub } from './testing/nav-stubs';
import { RouterStub, ActivatedRouteStub } from './testing/routing-stubs';
import { LeagueServiceStub } from './testing/league-stubs';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let routerStub: RouterStub;
  let activatedRoute: ActivatedRouteStub;
  
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponentStub,
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
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
    activatedRoute.testParams = {league_id: '123'};
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
    let debugElement = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(debugElement).toBeTruthy();
  });

  it('should have league Id after changing url', fakeAsync(() => {
    let fixture = TestBed.createComponent(AppComponent);
    activatedRoute.testParams = {league_id: '123'};
    fixture.detectChanges();    
    tick();
    expect(fixture.componentInstance.leagueId).toEqual('123');
  }));
});
