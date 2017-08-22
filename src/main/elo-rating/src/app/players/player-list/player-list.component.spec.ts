import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { UserCreatePlayerStubComponent } from './../../testing/user-stubs';
import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { NgbModalStub } from './../../testing/bootstrap-stubs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../shared/player.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { fakeAsync, tick } from '@angular/core/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlayerListComponent } from './player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ 
        PlayerListComponent, 
        SpinnerComponent,
        UserCreatePlayerStubComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: NgbModal, useClass: NgbModalStub},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {league_id: '123'}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should has active players list', fakeAsync(() => {
    createComponent();
    let playersCount = component.activePlayers.length + component.inactivePlayers.length;
    expect(playersCount).toBeGreaterThan(0);
  }));

  it('should present players in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should display alert if players list is empty', fakeAsync(() => {
    createComponent();
    component.activePlayers = [];
    component.inactivePlayers = [];
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should disable player', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let activePlayersCount = component.activePlayers.length;
    let inactivePlayersCount = component.inactivePlayers.length;
    component.disable(0);
    tick();
    expect(component.activePlayers.length).toEqual(activePlayersCount - 1);
    expect(component.inactivePlayers.length).toEqual(inactivePlayersCount + 1);
  }));

  it('should delete player from list', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let playersCount = component.activePlayers.length + component.inactivePlayers.length;    
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr td button'));
    debugElement[0].triggerEventHandler('click', null);
    component.delete(0); // Called manually because of comment in bootstrap-stubs
    tick();
    let playersCountAfterDelete = component.activePlayers.length + component.inactivePlayers.length;
    expect(playersCountAfterDelete).toEqual(playersCount - 1);
  }))
});
