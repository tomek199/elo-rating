import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.css']
})
export class PageSizeComponent implements OnInit {

  @Output() onPageChange = new EventEmitter<number>();
  pageSize: number;

  constructor() { }

  ngOnInit() {
    this.pageSize = 5;
    this.onPageChange.emit(this.pageSize);
  }

  setPageSize() {
    this.onPageChange.emit(this.pageSize);
  }
}
