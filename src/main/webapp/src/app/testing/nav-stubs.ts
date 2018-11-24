import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-nav',
  template: ''
})
export class NavComponentStub implements OnChanges {
  @Input() leagueId: string; 
  ngOnChanges(): void { }
}
