import {ActivatedRouteStub, RouterStub} from './../../testing/routing-stubs';
import {UserServiceStub} from './../../testing/user-stubs';
import {UserService} from './../shared/user.service';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from './../shared/user.model';
import {By} from '@angular/platform-browser';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {UserCreatePlayerComponent} from './user-create-player.component';

describe('UserCreatePlayerComponent', () => {
  let component: UserCreatePlayerComponent;
  let fixture: ComponentFixture<UserCreatePlayerComponent>;
  let activatedRoute: ActivatedRouteStub;  

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();    
    TestBed.configureTestingModule({
      declarations: [ UserCreatePlayerComponent ],
      providers: [
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}, 
        {provide: UserService, useClass: UserServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},        
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreatePlayerComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not present card for unauthorized user', () => {
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthorized').and.returnValue(false);
    component.ngOnInit();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.card'));
    expect(debugElement).toBeFalsy();
  });

  it('should not present card for player with user', () => {
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthorized').and.returnValue(true);
    let user = new User();
    spyOn(authService, 'getCurrentUser').and.returnValue(user);
    spyOn(authService, 'getCurrentPlayerId').and.returnValue('123');
    component.ngOnInit();        
    fixture.detectChanges();    
    let debugElement = fixture.debugElement.query(By.css('div.card'));
    expect(debugElement).toBeFalsy();
  })

  it('should present card for player without user', () => {
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthorized').and.returnValue(true);
    spyOn(authService, 'getCurrentUser').and.returnValue(new User());
    spyOn(authService, 'getCurrentPlayerId').and.returnValue(null);
    component.ngOnInit();    
    fixture.detectChanges();    
    let debugElement = fixture.debugElement.query(By.css('div.card'));
    expect(debugElement).toBeTruthy();
  });

  it('should create new player and redirect to player details', inject([Router], fakeAsync((router: Router) => {
    const authService = fixture.debugElement.injector.get(GoogleAuthService);
    spyOn(authService, 'isAuthorized').and.returnValue(true);
    spyOn(authService, 'getCurrentUser').and.returnValue(new User());
    spyOn(authService, 'getCurrentPlayerId').and.returnValue(null);    
    const routerSpy = spyOn(router, 'navigate');
    component.ngOnInit();    
    fixture.detectChanges();    
    let button = fixture.debugElement.query(By.css('div.card div.card-body button'));
    button.triggerEventHandler('click', null);
    tick();
    expect(routerSpy.calls.first().args[0][0]).toEqual('/leagues');
    expect(routerSpy.calls.first().args[0][1]).toBeTruthy();
    expect(routerSpy.calls.first().args[0][2]).toEqual('players');  
    expect(routerSpy.calls.first().args[0][3]).toBeNull();
  })));
});
