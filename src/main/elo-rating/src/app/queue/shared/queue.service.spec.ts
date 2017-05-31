import { QueueService } from './queue.service';
import { HttpModule } from '@angular/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

describe('QueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [QueueService]
    });
  });

  it('should ...', inject([QueueService], (service: QueueService) => {
    expect(service).toBeTruthy();
  }));
});
