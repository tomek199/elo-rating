import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {By} from '@angular/platform-browser';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmModalComponent} from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      imports: [ NgbModule.forRoot()],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display modal title', () => {
    const TITLE = 'Delete!';
    component.title = TITLE;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.modal-header h3.modal-title'));
    expect(debugElement.nativeElement.textContent).toEqual(TITLE);
  });

  it('should display modal text', () => {
    const TEXT = 'Some modal text!';
    component.text = TEXT;
    fixture.detectChanges();
    let debugElement = fixture.debugElement.query(By.css('div.modal-body p'));
    expect(debugElement.nativeElement.textContent).toEqual(TEXT);
  })

  it('should "No" button be clicable', () => {
    let debugElement = fixture.debugElement.query(By.css('div.modal-footer button.btn.btn-secondary'));
    debugElement.triggerEventHandler('click', null);
  });

  it('should "Yes" button be clicable', () => {
    let debugElement = fixture.debugElement.query(By.css('div.modal-footer button.btn.btn-primary'));
    debugElement.triggerEventHandler('click', null);
  });
});
