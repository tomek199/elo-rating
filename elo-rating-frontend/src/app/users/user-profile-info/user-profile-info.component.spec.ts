import { By } from '@angular/platform-browser';
import { USERS } from './../../testing/data/users';
import { User } from './../shared/user.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileInfoComponent } from './user-profile-info.component';
import { FormsModule } from '@angular/forms';
import { CommonService } from 'app/core/shared/common.service';
import { CommonServiceStub } from 'app/testing/common-stubs';

describe('UserProfileInfoComponent', () => {
  let component: UserProfileInfoComponent;
  let fixture: ComponentFixture<UserProfileInfoComponent>;
  let stubUser: User;

  beforeEach(async(() => {
    stubUser = USERS[0];
    TestBed.configureTestingModule({
      declarations: [ UserProfileInfoComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: CommonService, useClass: CommonServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileInfoComponent);
    component = fixture.componentInstance;
    component.user = stubUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains information about user profile', () => {
    fixture.whenStable().then(() => {
      let picture = fixture.debugElement.query(By.css('form div.form-group div img'));
      let name = fixture.debugElement.query(By.css('form div.form-group div input[name=name]'));
      let email = fixture.debugElement.query(By.css('form div.form-group div input[name=email]'));
      expect(picture.properties['src']).toEqual(stubUser.pictureUrl);
      expect(name.nativeElement.value).toEqual(stubUser.name);
      expect(email.nativeElement.value).toEqual(stubUser.email);
    });
  });

  it('shoudle have default timezone selected as user timezone', () => {
    let option = fixture.debugElement.query(By.css('form div.form-group div select option[selected]'));
    // TODO: How to test which element is selected
    //expect(option).toBeTruthy();
    //expect(option.nativeElement.value).toEqual(component.user.timezone);
  });
});
