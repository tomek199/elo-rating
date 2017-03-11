import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQueueAddComponent } from './daily-queue-add.component';

describe('DailyQueueAddComponent', () => {
  let component: DailyQueueAddComponent;
  let fixture: ComponentFixture<DailyQueueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyQueueAddComponent ]
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
