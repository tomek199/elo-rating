/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DailyQueueComponent } from './daily-queue.component';

describe('DailyQueueComponent', () => {
  let component: DailyQueueComponent;
  let fixture: ComponentFixture<DailyQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
