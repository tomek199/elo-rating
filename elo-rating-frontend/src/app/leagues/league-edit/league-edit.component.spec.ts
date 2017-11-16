import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { LeagueServiceStub } from './../../testing/league-stubs';
import { LeagueService } from './../shared/league.service';
import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LeagueEditComponent } from './league-edit.component';

describe('LeagueEditComponent', () => {
  let component: LeagueEditComponent;
  let fixture: ComponentFixture<LeagueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueEditComponent, SpinnerComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub},
        {provide: LeagueService, useClass: LeagueServiceStub}
      ]
    })
    .compileComponents();
  }));

  function createComponent () {
    fixture = TestBed.createComponent(LeagueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
  }

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  it('should display warning alert if league does not exists', fakeAsync(() => {
    createComponent();
    component.league = null;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.alert.alert-warning'));
    expect(debugElement).toBeTruthy();
  }));

  it('should have league', fakeAsync(() => {
    createComponent();
    expect(component.league).toBeTruthy();
  }));

  it('should display league data in form', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let form = fixture.debugElement.query(By.css('form[name=leagueEdit]'));
      let name = form.query(By.css('input[name=name]'));
      expect(name.nativeElement.value).toEqual(component.league.name);
    });
  }));

  it('should update league data', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let form = fixture.debugElement.query(By.css('form[name=leagueEdit]'));
      let name = form.query(By.css('input[name=name]'));
      name.nativeElement.value = 'Updated name';
      name.nativeElement.dispatchEvent(new Event('input'));      
      tick();      
      let submit = form.query(By.css('button'));
      submit.triggerEventHandler('click', null);
      tick();
      expect(component.league.name).toEqual('Updated name');
    });
  }));

  it('should display success alert after changes has been saved', fakeAsync(() => {
    createComponent();
    fixture.detectChanges();
    let submit = fixture.debugElement.query(By.css('form button'));
    submit.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    let alert = fixture.debugElement.query(By.css('div.alert.alert-success'));
    expect(alert).toBeTruthy();
  }));
});
