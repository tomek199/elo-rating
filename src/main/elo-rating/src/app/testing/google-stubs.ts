import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-auth',
  template: ''
})
export class GoogleAuthComponentStub implements AfterViewInit {
  @Input() leagueId;
  ngAfterViewInit(): void { }
}