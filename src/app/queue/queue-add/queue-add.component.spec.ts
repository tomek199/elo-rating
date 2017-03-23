import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QueueAddComponent } from './queue-add.component';

describe('QueueAddComponent', () => {
  let component: QueueAddComponent;
  let fixture: ComponentFixture<QueueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueAddComponent ]
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
