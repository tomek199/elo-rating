/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        NavComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it ('should contain NavComponent', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(NavComponent))
    expect(debugElement).toBeTruthy();
  });

  it ('should have main-container div tag', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.css('div#main-container.container'));
    expect(debugElement).toBeTruthy();
  });
});
