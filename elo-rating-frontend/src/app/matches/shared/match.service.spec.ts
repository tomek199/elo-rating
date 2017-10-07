import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MatchService]
    });
  });

  it('should ...', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
