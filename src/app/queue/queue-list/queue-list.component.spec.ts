import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteStub } from './../../testing/routing-stubs';
import { ActivatedRoute } from '@angular/router';
import { PlayerServiceStub } from './../../testing/player-stubs';
import { PlayerService } from './../../players/shared/player.service';
import { QueueServiceStub, QUEUE } from './../../testing/queue-stubs';
import { HttpModule } from '@angular/http';
import { AppModule } from './../../app.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueueAddComponent } from './../queue-add/queue-add.component';
import { QueueListComponent } from './queue-list.component';

describe('QueueComponent', () => {
  let component: QueueListComponent;
  let fixture: ComponentFixture<QueueListComponent>;

  let playerService: PlayerService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueueListComponent,
        QueueAddComponent 
      ],
      imports: [ 
        FormsModule, 
        NgbModule.forRoot() 
      ], 
      providers: [
        { provide: PlayerService, useClass: PlayerServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have queue', () => {
    component.queue = QUEUE
    fixture.detectChanges();
    expect(component).toBeTruthy();
    let debugElement = fixture.debugElement.query(By.css('div#daily-queue h2'));
    expect(debugElement.nativeElement.textContent).toEqual('testQueue');
  })
});
