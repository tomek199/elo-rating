import {RouterTestingModule} from '@angular/router/testing';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../../players/shared/player.service';
import {By} from '@angular/platform-browser';
import {GoogleAuthServiceStub} from './../../testing/google-stubs';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {UserServiceStub} from './../../testing/user-stubs';
import {UserService} from './../shared/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UserInviteComponent} from './user-invite.component';
import {ActivatedRouteStub} from 'app/testing/routing-stubs';
import {ActivatedRoute} from '@angular/router';

describe('UserInviteComponent', () => {
  let component: UserInviteComponent;
  let fixture: ComponentFixture<UserInviteComponent>;
  let activatedRoute: ActivatedRouteStub;  

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();    
    TestBed.configureTestingModule({
      declarations: [ 
        UserInviteComponent,
        SpinnerComponent, 
      ], 
      imports: [
        RouterTestingModule,
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},        
        {provide: UserService, useClass: UserServiceStub},
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInviteComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display form after component init', () => {
    component.ngOnInit();
    let debugElement = fixture.debugElement.query(By.css('form'));
    expect(debugElement).toBeTruthy();
  });

  it('should not display alert before invitation send', () => {
    component.ngOnInit();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-success'));
    expect(debugElement).toBeFalsy();
  });

  it('should display alert and hide form after invitation send', fakeAsync(() => {
    component.ngOnInit();
    let button = fixture.debugElement.query(By.css('form button'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-success'));
    let form = fixture.debugElement.query(By.css('form'));
    expect(alert).toBeTruthy();
    expect(form).toBeFalsy();
  }));

  it('should clear component after click to alert close button', () => {
    component.ngOnInit();
    component.showSuccessAlert = true;
    fixture.detectChanges();
    let alertButton = fixture.debugElement.query(By.css('div.alert.alert-success button'));
    alertButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-success'));
    let form = fixture.debugElement.query(By.css('form'));
    expect(alert).toBeFalsy();
    expect(form).toBeTruthy();
  });
});
