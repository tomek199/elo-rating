import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './core/nav/nav.component';
import { DailyQueueComponent } from './daily-queue/daily-queue.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        DailyQueueComponent
      ],
      imports: [
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain NavComponent', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(NavComponent))
    expect(debugElement).toBeTruthy();
  });

  it('should have main-container div tag', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.css('div#main-container.container'));
    expect(debugElement).toBeTruthy();
  });

  it('should have router-outlet component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(debugElement).toBeTruthy();
  });

  it('should have app-daily-queue component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let debugElement = fixture.debugElement.query(By.directive(DailyQueueComponent))
    expect(debugElement).toBeTruthy();
  })
});
