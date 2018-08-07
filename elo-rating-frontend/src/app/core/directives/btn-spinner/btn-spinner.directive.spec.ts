import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BtnSpinnerDirective} from './btn-spinner.directive';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-test-component',
  template: '<button [btnSpinner]="testPromise" (click)="setPromise()">TestButton</button>'
})
class TestDirectiveComponent {
  testPromise: Promise<any>;

  setPromise() {
    this.testPromise = new Promise(() => {
    });
  }
}

describe('BtnSpinnerDirective', () => {

  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let button: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestDirectiveComponent,
        BtnSpinnerDirective
      ]
    });

    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  }));

  it('should pass', async(() => {
    expect(button).toBeTruthy();
  }));

  it('should have click method detected', async(() => {
    spyOn(component, 'setPromise');
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.setPromise).toHaveBeenCalled();
      // TODO: check if value checked during click
    })
  }));
});
