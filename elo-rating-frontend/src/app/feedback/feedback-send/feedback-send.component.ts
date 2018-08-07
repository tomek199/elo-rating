import {FeedbackService} from './../shared/feedback.service';
import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Feedback} from './../shared/feedback.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-feedback-send',
  templateUrl: './feedback-send.component.html',
  styleUrls: ['./feedback-send.component.css']
})
export class FeedbackSendComponent implements OnInit {
  feedback: Feedback;
  showSuccessAlert: boolean;

  constructor(
    private googleAuthService: GoogleAuthService,
    private feedbackService: FeedbackService
  ) {
    this.feedback = new Feedback();
  }

  ngOnInit() {
    this.showSuccessAlert = false;
    if (this.isAuthenticated()) 
      this.feedback.sender = this.googleAuthService.getCurrentUser().email;
  }

  isAuthenticated() {
    return this.googleAuthService.isAuthenticated();
  }

  showForm() {
    return this.showSuccessAlert != undefined && this.showSuccessAlert != true
  }

  send() {
    this.showSuccessAlert = undefined;
    this.feedbackService.send(this.feedback)
      .then(response => this.showSuccessAlert = true);
  }

  clear() {
    this.showSuccessAlert = false;
    this.feedback.text = undefined;
  }
}
