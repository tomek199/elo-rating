import { HttpModule } from '@angular/http';
import { AppModule } from './../../app.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueueAddComponent } from './../queue-add/queue-add.component';
import { QueueListComponent } from './queue-list.component';
import { QueueService } from './../shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';


describe('QueueComponent', () => {
  let component: QueueListComponent;
  let fixture: ComponentFixture<QueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QueueListComponent,
        QueueAddComponent
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
    fixture = TestBed.createComponent(QueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
