import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DailyQueueAddComponent } from './daily-queue-add.component';
import { QueueService } from './../shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';

describe('DailyQueueAddComponent', () => {
  let component: DailyQueueAddComponent;
  let fixture: ComponentFixture<DailyQueueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyQueueAddComponent ],
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
    fixture = TestBed.createComponent(DailyQueueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
