import {GoogleAuthService} from './../../auth/shared/google-auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseApiService} from "../../core/shared/base-api.service";
import {EmailsNotifications} from 'app/users/shared/emailsNotifications.model';


@Injectable()
export class UserService extends BaseApiService {

  constructor(private http: Http, protected googleAuthService: GoogleAuthService) { 
    super(googleAuthService);
  }

  get(id: string): Promise<User> {
    let url = `${this.url}/users/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  signIn(idToken: string): Promise<User> {
    let url = `${this.url}/users/sign-in`;
    return this.http.post(url, idToken, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  findByName(name: string): Observable<User[]> {
    let url = `${this.url}/users/find-by-name?name=${name}`;
    return this.http.get(url)
      .map(response => response.json() as User[]);
  }

  assignLeague(leagueId: string, userId: string): Promise<User> {
    let url = `${this.url}/leagues/${leagueId}/users/${userId}/assign-league`;
    return this.http.post(url, null, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  inviteUser(leagueId: string, currentUserId: string, userToInvite: User): Promise<User> {
    let url = `${this.url}/leagues/${leagueId}/users/${currentUserId}/invite`;
    return this.http.post(url, userToInvite, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }  

  verifySecurityToken(token: string): Promise<boolean> {
    let url = `${this.url}/users/verify-security-token`;
    return this.http.post(url, token, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }

  completeInvitation(googleIdToken: string, securityToken: string): Promise<User> {
    let url = `${this.url}/users/confirm-invitation`;
    let requestBody = {googleIdToken: googleIdToken, securityToken: securityToken};
    return this.http.post(url, requestBody, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  createPlayer(leagueId: string, userId: string): Promise<User> {
    let url = `${this.url}/leagues/${leagueId}/users/${userId}/create-player`;
    return this.http.post(url, null, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateEmailNotifications(userId: string, emailNotifications: EmailsNotifications): Promise<User> {
    let url = `${this.url}/users/emails-notifications?user_id=${userId}`;
    return this.http.post(url, JSON.stringify(emailNotifications), { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateTimezone(userId: string, timezone: string): Promise<User> {
    let url = `${this.url}/users/timezone?user_id=${userId}`;
    return this.http.post(url, timezone, { headers: this.generateHeaders() })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }
}
