/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DailyQueueListComponent } from './daily-queue-list.component';

describe('DailyQueueComponent', () => {
  let component: DailyQueueListComponent;
  let fixture: ComponentFixture<DailyQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyQueueListComponent ]
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
