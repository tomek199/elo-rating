import {CookieService} from 'ng2-cookies';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.css']
})
export class PageSizeComponent implements OnInit {

  @Output() onPageChange = new EventEmitter<number>();
  pageSize: number;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.getDefaultPageSize();
    this.onPageChange.emit(this.pageSize);
  }

  setPageSize() {
    this.cookieService.set('pageSize', String(this.pageSize), 300, '/');
    this.onPageChange.emit(this.pageSize);
  }

  private getDefaultPageSize() {
    if (this.cookieService.check('pageSize'))
      this.pageSize = +this.cookieService.get('pageSize');
    else 
      this.pageSize = 5;
  }
}
