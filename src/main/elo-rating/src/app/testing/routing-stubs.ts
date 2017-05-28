import { Injectable, Directive, Input } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};

  get testParams() { 
    return this._testParams; 
  }
  
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}

@Injectable()
export class RouterStub {
  public ne = new NavigationEnd(0, '/leagues/123', '/leagues/123');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigate(commands: any[]) {
    return commands;
  }
}

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStub {
  @Input('routerLink') linkParams: any;
}
