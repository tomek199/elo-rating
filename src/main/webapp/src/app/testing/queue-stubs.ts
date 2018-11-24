import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-queue-list',
    template: ''
})
export class QueueListComponentStub implements OnInit {
    @Input("leagueId") leagueId: string;

    ngOnInit(): void { }
}
