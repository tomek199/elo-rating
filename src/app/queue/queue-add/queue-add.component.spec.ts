import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { QueueAddComponent } from './queue-add.component';
import { QueueService } from './../shared/queue.service';
import { QueueServiceStub } from './../../testing/queue-stubs';

describe('QueueAddComponent', () => {
  let component: QueueAddComponent;
  let fixture: ComponentFixture<QueueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueAddComponent ],
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
    fixture = TestBed.createComponent(QueueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
