import {Feedback} from './../feedback/shared/feedback.model';
import {Injectable} from '@angular/core';

@Injectable()
export class FeedbackServiceStub {

  send(feedback: Feedback): Promise<boolean> {
    return Promise.resolve(true);
  }
}
