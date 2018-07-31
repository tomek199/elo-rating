import {environment} from './../../../environments/environment.prod';
import {AfterViewInit, Component, EventEmitter, Input, NgZone, Output} from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css']
})
export class GoogleButtonComponent implements AfterViewInit {

  @Input() buttonId: string;
  @Output() onSignIn = new EventEmitter<any>();

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.initAuthModule();
    this.initButton();
  }

  private initAuthModule() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: environment.googleClientId
      });
    });
  }

  private initButton() {
    gapi.signin2.render(this.buttonId,
      {
        onSuccess: this.signedIn,
        scope: 'profile email'
      });
  }

  signedIn = (googleUser: any) => {
    this.zone.run(() => {
      this.onSignIn.emit(googleUser);
    });
  }
}
