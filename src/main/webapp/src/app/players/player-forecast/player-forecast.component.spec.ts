import {SpinnerComponent} from './../../core/directives/spinner/spinner.component';
import {PlayerServiceStub} from './../../testing/player-stubs';
import {PlayerService} from './../shared/player.service';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PlayerForecastComponent} from './player-forecast.component';

describe('PlayerForecastComponent', () => {
  let component: PlayerForecastComponent;
  let fixture: ComponentFixture<PlayerForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerForecastComponent, SpinnerComponent],
      providers: [
        {provide: PlayerService, useClass: PlayerServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(PlayerForecastComponent);
    component = fixture.componentInstance;
    component.playerId = '999';
    component.leagueId = '123';
    fixture.detectChanges();
    tick();
  }

  it('should be created', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should have player', fakeAsync(() => {
    createComponent();
    expect(component.player.id).toEqual('999');
    expect(component.player.username).toEqual('Forecast player');
  }));

  it('should have opponents', fakeAsync(() => {
    createComponent();
    expect(component.opponents.length).toBeGreaterThan(0);
  }));

  it('should display opponents on the list', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('ul.list-group li.list-group-item'));
    expect(debugElement.length).toBeGreaterThan(0);
  }));

  it('should display current player disabled on the list', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('ul.list-group li.list-group-item.disabled'));
    expect(debugElement.nativeElement.textContent).toContain('Forecast player');
  }));

  it('should display alert if opponent is not selected', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-info'));
    expect(debugElement).toBeTruthy();
  }));

  it('should have forecast matches after choosing opponent', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('ul.list-group li.list-group-item'));
    debugElement[0].triggerEventHandler('click', null);
    tick(); 
    expect(component.forecast.length).toEqual(4);
  }));

  it('should display forecast when opponent is selected', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let debugElement = fixture.debugElement.queryAll(By.css('ul.list-group li.list-group-item'));
    debugElement[0].triggerEventHandler('click', null);
    tick(); 
    fixture.detectChanges();
    let wins = fixture.debugElement.queryAll(By.css('div div.alert.alert-success'));
    expect(wins.length).toEqual(2);
    let lost = fixture.debugElement.queryAll(By.css('div div.alert.alert-danger'));
    expect(lost.length).toEqual(2);
  }))
});
