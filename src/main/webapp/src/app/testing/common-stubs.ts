import {Injectable} from "@angular/core";


@Injectable()
export class CommonServiceStub {

    timezones = [
        'GMT0:00 GMT',
        'GMT0:00 WET',
        'GMT0:00 Zulu'
    ]
    getTimezones(): Promise<string[]> {
        return Promise.resolve(this.timezones);
    }
}
