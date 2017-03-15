import { ActivatedRoute } from '@angular/router';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { MatchAddComponent } from './match-add.component';

fdescribe('MatchAddComponent', () => {
  let component: MatchAddComponent;
  let fixture: ComponentFixture<MatchAddComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ MatchAddComponent ], 
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(MatchAddComponent);
    component = fixture.componentInstance;
    activatedRoute.testParams = {tournament_id: '123'}
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have tournament id', fakeAsync(() => {
    createComponent();
    expect(component.tournamentId).toEqual('123');
  }));
});
