import { DailyQueueService } from './daily-queue.service';
import { HttpModule } from '@angular/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

describe('DailyQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DailyQueueService]
    });
  });

  it('should ...', inject([DailyQueueService], (service: DailyQueueService) => {
    expect(service).toBeTruthy();
  }));
});
