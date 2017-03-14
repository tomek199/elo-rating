import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAddComponent } from './match-add.component';

describe('MatchAddComponent', () => {
  let component: MatchAddComponent;
  let fixture: ComponentFixture<MatchAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
