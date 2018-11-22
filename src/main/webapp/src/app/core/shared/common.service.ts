import {Injectable} from "@angular/core";
import {BaseApiService} from "app/core/shared/base-api.service";
import {Http} from "@angular/http";
import {GoogleAuthService} from "app/auth/shared/google-auth.service";


@Injectable()
export class CommonService extends BaseApiService {

    constructor(private http: Http, protected googleAuthService: GoogleAuthService) {
        super(googleAuthService);
    }

    getTimezones(): Promise<string[]> {
        let url = `${this.url}/common/timezones`
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as string[]);
    }
}
