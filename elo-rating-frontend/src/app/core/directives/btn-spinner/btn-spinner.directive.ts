import { Input, ElementRef, Directive, AfterContentInit, HostListener } from '@angular/core';
import { setTimeout } from 'timers';

@Directive({
  selector: '[btnSpinner]'
})
export class BtnSpinnerDirective implements AfterContentInit {

  buttonElem: HTMLElement;
  originalText: string;
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
    this.buttonElem.innerText = 'Loading...';
  }

  restoreBtnOriginalText() {
    this.buttonElem.innerText = this.originalText;
  }

  disableBtn() {
    this.buttonElem.setAttribute('disabled', 'disabled');
  }

  enableBtn() {
    this.buttonElem.removeAttribute('disabled');
  }

  changeBtnToWaitState() {
    this.disableBtn();
    this.changeButtonText();
  }

  restoreBtnStateAfterPromise() {
    this.enableBtn();
    this.restoreBtnOriginalText();
  }

  initPromiseHandler() {
    if (this.promise) {
      this.originalText = this.buttonElem.innerText;
      const promise = this.promise;
      this.isPromiseFinished = false;

      const resolveLoadingState = () => {
        this.isPromiseFinished = true;
        this.restoreBtnStateAfterPromise();
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
      this.changeBtnToWaitState();
    }, 0);
  }

}
