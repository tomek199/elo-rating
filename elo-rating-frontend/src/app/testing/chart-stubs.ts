import { Injectable, Component, Input, OnInit } from '@angular/core';
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'chart',
  template: ''
})
export class ChartComponentStub implements OnInit {
  @Input() options: any;
  
  constructor() { }
  ngOnInit() { }
}
