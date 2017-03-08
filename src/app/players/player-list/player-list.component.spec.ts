import { NgbModalStub } from './../../testing/bootstrap-stubs.';
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
      declarations: [ PlayerListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: NgbModal, useClass: NgbModalStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: '123'}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should has players list', fakeAsync(() => {
    createComponent();
    expect(component.players.length).toBeGreaterThan(0);
  }));

  it('should present players in table', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should display alert if players list is empty', fakeAsync(() => {
    createComponent();
    component.players = [];
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement.nativeElement).toBeTruthy();
  }));

  it('should delete player from list', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let playerCount = component.players.length;
    let debugElement = fixture.debugElement.queryAll(By.css('table tbody tr td button'));
    debugElement[0].triggerEventHandler('click', null);
    component.delete(0); // Called manually because of comment in bootstrap-stubs
    expect(component.players.length).toEqual(playerCount - 1);
  }))
});
