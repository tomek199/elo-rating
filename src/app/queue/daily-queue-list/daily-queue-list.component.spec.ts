import { HttpModule } from '@angular/http';
import { AppModule } from './../../app.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DailyQueueAddComponent } from './../daily-queue-add/daily-queue-add.component';
import { DailyQueueListComponent } from './daily-queue-list.component';
import { QueueService } from './../shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';


describe('DailyQueueComponent', () => {
  let component: DailyQueueListComponent;
  let fixture: ComponentFixture<DailyQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DailyQueueListComponent,
        DailyQueueAddComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        { provide: QueueService, useClass: QueueServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
