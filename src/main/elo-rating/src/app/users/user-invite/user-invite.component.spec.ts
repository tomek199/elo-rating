import { By } from '@angular/platform-browser';
import { GoogleAuthServiceStub } from './../../testing/google-stubs';
import { GoogleAuthService } from './../../auth/shared/google-auth.service';
import { UserServiceStub } from './../../testing/user-stubs';
import { UserService } from './../shared/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './../../core/directives/spinner/spinner.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserInviteComponent } from './user-invite.component';

describe('UserInviteComponent', () => {
  let component: UserInviteComponent;
  let fixture: ComponentFixture<UserInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        UserInviteComponent,
        SpinnerComponent, 
      ], 
      imports: [
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        {provide: UserService, useClass: UserServiceStub},
        {provide: GoogleAuthService, useClass: GoogleAuthServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInviteComponent);
    component = fixture.componentInstance;
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
