import {Component, Input} from '@angular/core';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'ui-switch',
    template: ''
})
export class UiSwitcherStub implements OnInit {
  @Input() ngModel: any;

  constructor() { }
  ngOnInit() { }

}
