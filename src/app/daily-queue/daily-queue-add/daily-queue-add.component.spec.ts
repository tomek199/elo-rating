import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DailyQueueAddComponent } from './daily-queue-add.component';
import { DailyQueueService } from './../shared/daily-queue.service';
import { DailyQueueServiceStub } from './../../testing/dailyQueue-stubs';

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
       { provide: DailyQueueService, useClass: DailyQueueServiceStub }
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
