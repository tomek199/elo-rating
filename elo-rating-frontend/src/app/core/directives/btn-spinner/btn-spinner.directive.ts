import { Input, ElementRef, Directive, AfterContentInit, HostListener } from '@angular/core';
import { setTimeout } from 'timers';

@Directive({
  selector: '[btnSpinner]'
})
export class BtnSpinnerDirective implements AfterContentInit {

  buttonElem: HTMLElement;
  isPromiseFinished: boolean;
  promise: any;

  constructor(el: ElementRef) {
    this.buttonElem = el.nativeElement;
  }

  @Input()
  set btnSpinner(promise: any) {
    this.promise = promise;

    this.initPromiseHandler();
  }

  ngAfterContentInit() {
    this.initPromiseHandler();
  }

  changeButtonText() {
    // TODO: change button text
  }

  disableBtn() {
    this.buttonElem.setAttribute('disabled', 'disabled');
  }

  enableBtn() {
    this.buttonElem.removeAttribute('disabled');
  }

  waitState() {
    this.disableBtn();
  }

  restoreBtnStateAfterPromise() {
    this.enableBtn();
  }

  initPromiseHandler() {
    if (this.promise) {
      const promise = this.promise;
      this.isPromiseFinished = false;

      const resolveLoadingState = () => {
        this.isPromiseFinished = true;
        this.restoreBtnStateAfterPromise();
        console.log('Finished');
      };

      promise.then(resolveLoadingState)
        .then(resolveLoadingState)
        .catch(resolveLoadingState);
    }
  }

  @HostListener('click')
  handleBtnClick() {

    if (!this.promise) {
      return;
    }

    setTimeout(() => {
      this.waitState();
    }, 0);
  }

}
