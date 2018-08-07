import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnChanges {
  @Input() resource: any;
  show: boolean;

  constructor() { }

  ngOnChanges() {
    this.setShowProperty();
  }

  setShowProperty() {
    this.show = this.resource === undefined;
  }
}
